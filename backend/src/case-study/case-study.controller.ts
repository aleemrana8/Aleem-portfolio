import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CaseStudyService } from './case-study.service';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('case-studies')
export class CaseStudyController {
  constructor(private readonly caseStudyService: CaseStudyService) {}

  @Public()
  @Get()
  findAll() {
    return this.caseStudyService.findAll();
  }

  @Public()
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.caseStudyService.findBySlug(slug);
  }

  @Post()
  create(@Body() dto: CreateCaseStudyDto) {
    return this.caseStudyService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCaseStudyDto) {
    return this.caseStudyService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.caseStudyService.delete(id);
  }
}
