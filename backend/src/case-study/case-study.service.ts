import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';

@Injectable()
export class CaseStudyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findBySlug(slug: string) {
    const caseStudy = await this.prisma.caseStudy.findUnique({ where: { slug } });
    if (!caseStudy) throw new NotFoundException('Case study not found');
    return caseStudy;
  }

  async create(dto: CreateCaseStudyDto) {
    return this.prisma.caseStudy.create({ data: dto });
  }

  async update(id: string, dto: UpdateCaseStudyDto) {
    return this.prisma.caseStudy.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prisma.caseStudy.delete({ where: { id } });
  }
}
