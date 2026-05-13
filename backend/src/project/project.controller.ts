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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll(@Query('featured') featured?: string) {
    const featuredFilter = featured === 'true' ? true : featured === 'false' ? false : undefined;
    return this.projectService.findAll(featuredFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create project' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update project' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete project' })
  delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
