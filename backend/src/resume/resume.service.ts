import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class ResumeService {
  private readonly logger = new Logger(ResumeService.name);
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

  async getTemplates() {
    return this.prisma.resumeTemplate.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
  }

  async getTemplate(slug: string) {
    const template = await this.prisma.resumeTemplate.findUnique({ where: { slug } });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async generate(roleType: string, visitorId?: string) {
    // Find template matching role type
    const template = await this.prisma.resumeTemplate.findFirst({
      where: {
        OR: [
          { slug: roleType },
          { keywords: { has: roleType } },
        ],
        active: true,
      },
    });

    let content = template?.template || '# Resume\n\nNo template found for this role type.';

    // Optionally tailor content with OpenAI
    if (this.openai && template) {
      try {
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a resume tailoring assistant. Given a resume template, slightly tailor the language to emphasize relevance for the specified role type. Keep all factual information intact. Return markdown.',
            },
            {
              role: 'user',
              content: `Role type: ${roleType}\n\nTemplate:\n${template.template}`,
            },
          ],
          max_tokens: 2000,
        });

        content = completion.choices[0]?.message?.content || content;
      } catch (error) {
        this.logger.error('OpenAI resume tailoring error', error);
      }
    }

    // Track download
    await this.prisma.resumeDownload.create({
      data: {
        templateId: template?.id,
        roleType,
        visitorId,
      },
    });

    return { content, roleType, templateId: template?.id };
  }

  async getDownloads() {
    const [data, total] = await Promise.all([
      this.prisma.resumeDownload.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
      }),
      this.prisma.resumeDownload.count(),
    ]);

    return { data, total };
  }
}
