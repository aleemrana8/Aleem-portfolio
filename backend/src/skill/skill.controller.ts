import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { CreateSkillGroupDto } from './dto/create-skill-group.dto';
import { CreateSkillDto } from './dto/create-skill.dto';

@ApiTags('Skills')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  @ApiOperation({ summary: 'Get all skill groups with skills' })
  findAllGroups() {
    return this.skillService.findAllGroups();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get skill group by ID' })
  findOneGroup(@Param('id') id: string) {
    return this.skillService.findOneGroup(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create skill group' })
  createGroup(@Body() dto: CreateSkillGroupDto) {
    return this.skillService.createGroup(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update skill group' })
  updateGroup(@Param('id') id: string, @Body() dto: CreateSkillGroupDto) {
    return this.skillService.updateGroup(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete skill group' })
  deleteGroup(@Param('id') id: string) {
    return this.skillService.deleteGroup(id);
  }

  @Post('items')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add skill to a group' })
  createSkill(@Body() dto: CreateSkillDto) {
    return this.skillService.createSkill(dto);
  }

  @Delete('items/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a skill' })
  deleteSkill(@Param('id') id: string) {
    return this.skillService.deleteSkill(id);
  }
}
