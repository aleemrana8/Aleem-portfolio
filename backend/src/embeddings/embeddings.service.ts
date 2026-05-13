import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class EmbeddingsService {
  private readonly logger = new Logger(EmbeddingsService.name);
  private openai: OpenAI | null = null;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async syncAll() {
    let synced = 0;

    // Sync profiles
    const profiles = await this.prisma.profile.findMany();
    for (const profile of profiles) {
      const content = [profile.name, profile.headline, profile.subheadline, profile.summary].filter(Boolean).join('\n');
      await this.upsertEmbedding('resume', profile.id, content);
      synced++;
    }

    // Sync experiences
    const experiences = await this.prisma.experience.findMany();
    for (const exp of experiences) {
      const content = [exp.title, exp.company, exp.description, ...(exp.bullets || [])].filter(Boolean).join('\n');
      await this.upsertEmbedding('experience', exp.id, content);
      synced++;
    }

    // Sync projects
    const projects = await this.prisma.project.findMany();
    for (const project of projects) {
      const content = [project.title, project.tagline, project.description, project.problem, project.solution, project.outcome, ...(project.stack || [])].filter(Boolean).join('\n');
      await this.upsertEmbedding('project', project.id, content);
      synced++;
    }

    // Sync skills
    const skillGroups = await this.prisma.skillGroup.findMany({ include: { skills: true } });
    for (const group of skillGroups) {
      const content = [group.name, ...group.skills.map((s) => s.name)].join('\n');
      await this.upsertEmbedding('skill', group.id, content);
      synced++;
    }

    // Sync blog posts
    const posts = await this.prisma.blogPost.findMany({ where: { published: true } });
    for (const post of posts) {
      const content = [post.title, post.excerpt, post.content, ...(post.tags || [])].filter(Boolean).join('\n');
      await this.upsertEmbedding('blog', post.id, content);
      synced++;
    }

    // Sync case studies
    const caseStudies = await this.prisma.caseStudy.findMany({ where: { published: true } });
    for (const cs of caseStudies) {
      const content = [cs.title, cs.subtitle, cs.problem, cs.solution, cs.businessContext, cs.architecture, cs.workflow, ...(cs.stack || [])].filter(Boolean).join('\n');
      await this.upsertEmbedding('service', cs.id, content);
      synced++;
    }

    this.logger.log(`Synced ${synced} embeddings`);
    return { synced };
  }

  async search(query: string, limit = 5): Promise<{ id: string; source: string; content: string; similarity: number }[]> {
    const embedding = await this.generateEmbedding(query);
    if (!embedding) {
      // Fallback to keyword search
      return this.keywordSearch(query, limit);
    }

    const vectorStr = `[${embedding.join(',')}]`;
    const results = await this.prisma.$queryRawUnsafe<
      { id: string; source: string; content: string; similarity: number }[]
    >(
      `SELECT id, source, content, 
              1 - (embedding <=> $1::vector) as similarity
       FROM "AIEmbedding" 
       WHERE embedding IS NOT NULL
       ORDER BY embedding <=> $1::vector
       LIMIT $2`,
      vectorStr,
      limit,
    );

    return results;
  }

  async getStatus() {
    const results = await this.prisma.aIEmbedding.groupBy({
      by: ['source'],
      _count: { id: true },
    });

    return results.map((r) => ({ source: r.source, count: r._count.id }));
  }

  private async generateEmbedding(text: string): Promise<number[] | null> {
    if (!this.openai) return null;

    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text.slice(0, 8000),
      });
      return response.data[0].embedding;
    } catch (error) {
      this.logger.error('Embedding generation failed', error);
      return null;
    }
  }

  private async keywordSearch(query: string, limit: number) {
    const keywords = query.split(/\s+/).filter((w) => w.length > 3).slice(0, 5);
    if (keywords.length === 0) return [];

    const results = await this.prisma.aIEmbedding.findMany({
      where: {
        OR: keywords.map((keyword) => ({
          content: { contains: keyword, mode: 'insensitive' as any },
        })),
      },
      take: limit,
    });

    return results.map((r) => ({
      id: r.id,
      source: r.source,
      content: r.content,
      similarity: 0.5,
    }));
  }

  private async upsertEmbedding(source: string, sourceId: string, content: string) {
    const embedding = await this.generateEmbedding(content);
    const existing = await this.prisma.aIEmbedding.findFirst({
      where: { source, sourceId },
    });

    if (existing) {
      if (embedding) {
        const vectorStr = `[${embedding.join(',')}]`;
        await this.prisma.$executeRawUnsafe(
          `UPDATE "AIEmbedding" SET content = $1, embedding = $2::vector, "updatedAt" = NOW() WHERE id = $3`,
          content,
          vectorStr,
          existing.id,
        );
      } else {
        await this.prisma.aIEmbedding.update({
          where: { id: existing.id },
          data: { content, updatedAt: new Date() },
        });
      }
    } else {
      if (embedding) {
        const vectorStr = `[${embedding.join(',')}]`;
        await this.prisma.$executeRawUnsafe(
          `INSERT INTO "AIEmbedding" (id, source, "sourceId", content, embedding, "createdAt", "updatedAt")
           VALUES (gen_random_uuid()::text, $1, $2, $3, $4::vector, NOW(), NOW())`,
          source,
          sourceId,
          content,
          vectorStr,
        );
      } else {
        await this.prisma.aIEmbedding.create({
          data: { source, sourceId, content },
        });
      }
    }
  }
}
