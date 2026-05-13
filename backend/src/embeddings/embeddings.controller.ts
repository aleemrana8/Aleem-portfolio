import { Controller, Get, Post } from '@nestjs/common';
import { EmbeddingsService } from './embeddings.service';

@Controller('embeddings')
export class EmbeddingsController {
  constructor(private readonly embeddingsService: EmbeddingsService) {}

  @Post('sync')
  syncAll() {
    return this.embeddingsService.syncAll();
  }

  @Get('status')
  getStatus() {
    return this.embeddingsService.getStatus();
  }
}
