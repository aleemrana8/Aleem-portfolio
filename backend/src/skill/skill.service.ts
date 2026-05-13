import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillGroupDto } from './dto/create-skill-group.dto';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  async findAllGroups() {
    return this.prisma.skillGroup.findMany({
      include: { skills: { orderBy: { order: 'asc' } } },
      orderBy: { order: 'asc' },
    });
  }

  async findOneGroup(id: string) {
    const group = await this.prisma.skillGroup.findUnique({
      where: { id },
      include: { skills: { orderBy: { order: 'asc' } } },
    });
    if (!group) throw new NotFoundException('Skill group not found');
    return group;
  }

  async createGroup(dto: CreateSkillGroupDto) {
    return this.prisma.skillGroup.create({ data: dto });
  }

  async updateGroup(id: string, dto: Partial<CreateSkillGroupDto>) {
    await this.findOneGroup(id);
    return this.prisma.skillGroup.update({
      where: { id },
      data: dto,
      include: { skills: true },
    });
  }

  async deleteGroup(id: string) {
    await this.findOneGroup(id);
    return this.prisma.skillGroup.delete({ where: { id } });
  }

  async createSkill(dto: CreateSkillDto) {
    return this.prisma.skill.create({ data: dto });
  }

  async deleteSkill(id: string) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundException('Skill not found');
    return this.prisma.skill.delete({ where: { id } });
  }
}
