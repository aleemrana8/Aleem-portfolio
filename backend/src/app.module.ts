import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { BlogModule } from './blog/blog.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { ContactModule } from './contact/contact.module';
import { SettingsModule } from './settings/settings.module';
import { UploadModule } from './upload/upload.module';
import { AiAssistantModule } from './ai-assistant/ai-assistant.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { ResumeModule } from './resume/resume.module';
import { CaseStudyModule } from './case-study/case-study.module';
import { MetricsModule } from './metrics/metrics.module';
import { EmbeddingsModule } from './embeddings/embeddings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    ProfileModule,
    ExperienceModule,
    ProjectModule,
    SkillModule,
    BlogModule,
    TestimonialModule,
    ContactModule,
    SettingsModule,
    UploadModule,
    AiAssistantModule,
    AnalyticsModule,
    RecruiterModule,
    ResumeModule,
    CaseStudyModule,
    MetricsModule,
    EmbeddingsModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
