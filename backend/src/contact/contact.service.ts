import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { sendMail, buildOwnerEmail, buildSenderEmail } from '../lib/mailer';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    const msg = await this.prisma.contactMessage.create({ data: dto });

    // Send emails in background — don't block the response
    Promise.all([
      sendMail(buildOwnerEmail(dto)),
      sendMail(buildSenderEmail(dto)),
    ]).catch((err) => console.error('Email send failed:', err));

    return msg;
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
