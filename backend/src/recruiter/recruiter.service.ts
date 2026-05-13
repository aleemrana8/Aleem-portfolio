import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class RecruiterService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    return this.prisma.recruiterLead.create({ data: dto });
  }

  async findAll() {
    return this.prisma.recruiterLead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, dto: UpdateLeadDto) {
    return this.prisma.recruiterLead.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prisma.recruiterLead.delete({ where: { id } });
  }
}
