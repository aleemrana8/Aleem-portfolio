import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('recruiter')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Public()
  @Post('leads')
  create(@Body() dto: CreateLeadDto) {
    return this.recruiterService.create(dto);
  }

  @Get('leads')
  findAll() {
    return this.recruiterService.findAll();
  }

  @Patch('leads/:id')
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.recruiterService.update(id, dto);
  }

  @Delete('leads/:id')
  delete(@Param('id') id: string) {
    return this.recruiterService.delete(id);
  }
}
