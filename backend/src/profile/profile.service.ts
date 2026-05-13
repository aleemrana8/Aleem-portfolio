import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async get() {
    return this.prisma.profile.findFirst({ include: { user: { select: { email: true, name: true } } } });
  }

  async update(dto: UpdateProfileDto) {
    const profile = await this.prisma.profile.findFirst();
    if (!profile) return null;
    return this.prisma.profile.update({ where: { id: profile.id }, data: dto });
  }
}
