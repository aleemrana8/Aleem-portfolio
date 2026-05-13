import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async findAll(featured?: boolean) {
    const where = featured !== undefined ? { featured } : {};
    return this.prisma.project.findMany({
      where,
      include: { media: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { media: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(dto: CreateProjectDto) {
    return this.prisma.project.create({ data: dto });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: dto,
      include: { media: true },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.project.delete({ where: { id } });
  }
}
