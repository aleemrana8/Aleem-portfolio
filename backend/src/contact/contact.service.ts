import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    return this.prisma.contactMessage.create({ data: dto });
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const message = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!message) throw new NotFoundException('Contact message not found');
    return message;
  }

  async markAsRead(id: string) {
    await this.findOne(id);
    return this.prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.contactMessage.delete({ where: { id } });
  }
}
