import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { ChatDto } from './dto/chat.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('ai')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Public()
  @Post('chat')
  chat(@Body() dto: ChatDto) {
    return this.aiAssistantService.chat(dto.message, dto.sessionId, dto.visitorId, dto.mode);
  }

  @Get('sessions')
  getSessions() {
    return this.aiAssistantService.getSessions();
  }

  @Get('sessions/:sessionId')
  getSession(@Param('sessionId') sessionId: string) {
    return this.aiAssistantService.getSession(sessionId);
  }

  @Delete('sessions/:id')
  deleteSession(@Param('id') id: string) {
    return this.aiAssistantService.deleteSession(id);
  }
}
