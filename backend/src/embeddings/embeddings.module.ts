import { Module } from '@nestjs/common';
import { EmbeddingsController } from './embeddings.controller';
import { EmbeddingsService } from './embeddings.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmbeddingsController],
  providers: [EmbeddingsService],
})
export class EmbeddingsModule {}
