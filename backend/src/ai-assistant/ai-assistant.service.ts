import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are "Ask Aleem AI" — a portfolio intelligence system designed EXCLUSIVELY to discuss Rana Muhammad Aleem Akhtar's portfolio, projects, skills, technical experience, AI systems, and services.

=== STRICT BOUNDARY ===
You must ONLY answer questions directly related to Aleem's portfolio and the retrieved knowledge base below.
If a user asks anything outside Aleem's portfolio scope, respond with:
"I'm specifically designed to discuss Aleem's portfolio — his AI projects, technical leadership, healthcare automation systems, and services."

=== PERSONALITY ===
- Professional, articulate, and technically precise
- Enthusiastic about AI, healthcare automation, and technical leadership
- Helpful and proactive with recruiters and hiring managers
- Conversational but concise

=== RECRUITER DETECTION ===
If the visitor appears to be a recruiter or hiring manager:
- Highlight relevant experience and leadership track record
- Mention he's open to AI leadership, product management, and solution architect roles
- Suggest connecting via email (raleem811811@gmail.com) or LinkedIn

=== GROUNDING RULES ===
- ONLY answer from the provided knowledge base — never fabricate information
- If information is not in the knowledge base, say you don't have that information

=== CONTACT ===
Email: raleem811811@gmail.com | Phone: +923151664843
GitHub: github.com/aleemrana8 | LinkedIn: linkedin.com/in/aleem-akhtar`;

@Injectable()
export class AiAssistantService {
  private readonly logger = new Logger(AiAssistantService.name);
  private openai: OpenAI | null = null;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private embeddingsService: EmbeddingsService,
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

    // Semantic vector search via pgvector
    const contextResults = await this.embeddingsService.search(message, 5);
    const contextText = contextResults
      .filter((r) => r.similarity > 0.3)
      .map((r) => `[${r.source}] ${r.content}`)
      .join('\n\n---\n\n');

    // Build conversation history
    const history = session.messages.slice(-10).map((m) => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    }));

    const systemMessage = `${SYSTEM_PROMPT}\n\n=== RETRIEVED KNOWLEDGE BASE ===\n${contextText || 'No specific context found.'}`;

    let responseContent = 'I apologize, but I am unable to process your request at the moment. Please try again later or contact Aleem directly at raleem811811@gmail.com.';
    const sources = contextResults
      .filter((r) => r.similarity > 0.3)
      .map((r) => ({ source: r.source, id: r.id }));

    if (this.openai) {
      try {
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemMessage },
            ...history,
            { role: 'user', content: message },
          ],
          max_tokens: 1500,
          temperature: 0.7,
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
