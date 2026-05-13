import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all experiences' })
  findAll(@Query('current') current?: string) {
    const currentFilter = current === 'true' ? true : current === 'false' ? false : undefined;
    return this.experienceService.findAll(currentFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get experience by ID' })
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create experience' })
  create(@Body() dto: CreateExperienceDto) {
    return this.experienceService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update experience' })
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experienceService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete experience' })
  delete(@Param('id') id: string) {
    return this.experienceService.delete(id);
  }
}
