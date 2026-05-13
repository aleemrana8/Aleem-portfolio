import { Module } from '@nestjs/common';
import { RecruiterController } from './recruiter.controller';
import { RecruiterService } from './recruiter.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecruiterController],
  providers: [RecruiterService],
})
export class RecruiterModule {}
