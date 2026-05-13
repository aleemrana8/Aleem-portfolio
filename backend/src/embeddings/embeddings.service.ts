import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmbeddingsService {
  private readonly logger = new Logger(EmbeddingsService.name);

  constructor(private prisma: PrismaService) {}

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

  async getStatus() {
    const results = await this.prisma.aIEmbedding.groupBy({
      by: ['source'],
      _count: { id: true },
    });

    return results.map((r) => ({ source: r.source, count: r._count.id }));
  }

  private async upsertEmbedding(source: string, sourceId: string, content: string) {
    const existing = await this.prisma.aIEmbedding.findFirst({
      where: { source, sourceId },
    });

    if (existing) {
      await this.prisma.aIEmbedding.update({
        where: { id: existing.id },
        data: { content, updatedAt: new Date() },
      });
    } else {
      await this.prisma.aIEmbedding.create({
        data: { source, sourceId, content, embedding: [] },
      });
    }
  }
}
