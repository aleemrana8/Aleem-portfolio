import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class AiAssistantService {
  private readonly logger = new Logger(AiAssistantService.name);
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

  async chat(message: string, sessionId: string | undefined, visitorId: string, mode?: string) {
    // Find or create session
    let session = sessionId
      ? await this.prisma.chatSession.findUnique({ where: { id: sessionId }, include: { messages: true } })
      : null;

    if (!session) {
      session = await this.prisma.chatSession.create({
        data: { visitorId, mode: mode || 'general' },
        include: { messages: true },
      });
    }

    // Save user message
    await this.prisma.chatMessage.create({
      data: { sessionId: session.id, role: 'user', content: message },
    });

    // Search for relevant context using keyword search
    const keywords = message.split(/\s+/).filter((w) => w.length > 3).slice(0, 5);
    let contextResults: any[] = [];

    if (keywords.length > 0) {
      contextResults = await this.prisma.aIEmbedding.findMany({
        where: {
          OR: keywords.map((keyword) => ({
            content: { contains: keyword, mode: 'insensitive' as any },
          })),
        },
        take: 5,
      });
    }

    const contextText = contextResults.map((r) => r.content).join('\n\n');

    // Build conversation history
    const history = session.messages.slice(-10).map((m) => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    }));

    // Build prompt
    const systemMessage = `You are Aleem Akhtar's AI portfolio assistant. Answer questions about his skills, experience, projects, and availability. Be helpful, concise, and professional.${contextText ? `\n\nRelevant context:\n${contextText}` : ''}`;

    let responseContent = 'I apologize, but I am unable to process your request at the moment. Please try again later or contact Aleem directly.';
    const sources = contextResults.map((r) => ({ source: r.source, sourceId: r.sourceId }));

    if (this.openai) {
      try {
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemMessage },
            ...history,
            { role: 'user', content: message },
          ],
          max_tokens: 1000,
        });

        responseContent = completion.choices[0]?.message?.content || responseContent;
      } catch (error) {
        this.logger.error('OpenAI API error', error);
      }
    }

    // Save assistant response
    await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'assistant',
        content: responseContent,
        sources: sources.length > 0 ? sources : undefined,
      },
    });

    return {
      message: responseContent,
      sessionId: session.id,
      sources,
    };
  }

  async getSessions() {
    return this.prisma.chatSession.findMany({
      include: { messages: { take: 1, orderBy: { createdAt: 'desc' } } },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getSession(id: string) {
    return this.prisma.chatSession.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
  }

  async deleteSession(id: string) {
    return this.prisma.chatSession.delete({ where: { id } });
  }
}
