import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { GenerateResumeDto } from './dto/generate-resume.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Public()
  @Get('templates')
  getTemplates() {
    return this.resumeService.getTemplates();
  }

  @Public()
  @Get('templates/:slug')
  getTemplate(@Param('slug') slug: string) {
    return this.resumeService.getTemplate(slug);
  }

  @Public()
  @Post('generate')
  generate(@Body() dto: GenerateResumeDto) {
    return this.resumeService.generate(dto.roleType, dto.visitorId);
  }

  @Get('downloads')
  getDownloads() {
    return this.resumeService.getDownloads();
  }
}
