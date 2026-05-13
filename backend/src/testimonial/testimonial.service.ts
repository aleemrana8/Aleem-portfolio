import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialService {
  constructor(private prisma: PrismaService) {}

  async findAll(featured?: boolean) {
    const where = featured !== undefined ? { featured } : {};
    return this.prisma.testimonial.findMany({
      where,
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const testimonial = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) throw new NotFoundException('Testimonial not found');
    return testimonial;
  }

  async create(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({ data: dto });
  }

  async update(id: string, dto: UpdateTestimonialDto) {
    await this.findOne(id);
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.testimonial.delete({ where: { id } });
  }
}
