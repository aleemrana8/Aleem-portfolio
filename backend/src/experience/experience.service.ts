import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async findAll(current?: boolean) {
    const where = current !== undefined ? { current } : {};
    return this.prisma.experience.findMany({
      where,
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(id: string) {
    const experience = await this.prisma.experience.findUnique({ where: { id } });
    if (!experience) throw new NotFoundException('Experience not found');
    return experience;
  }

  async create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({ data: dto });
  }

  async update(id: string, dto: UpdateExperienceDto) {
    await this.findOne(id);
    return this.prisma.experience.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.experience.delete({ where: { id } });
  }
}
