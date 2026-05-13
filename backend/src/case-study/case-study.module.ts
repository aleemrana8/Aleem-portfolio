import { Module } from '@nestjs/common';
import { CaseStudyController } from './case-study.controller';
import { CaseStudyService } from './case-study.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CaseStudyController],
  providers: [CaseStudyService],
})
export class CaseStudyModule {}
