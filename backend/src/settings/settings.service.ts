import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    const settings = await this.prisma.siteSettings.findFirst();
    return settings;
  }

  async updateSettings(dto: UpdateSettingsDto) {
    const existing = await this.prisma.siteSettings.findFirst();
    if (existing) {
      return this.prisma.siteSettings.update({
        where: { id: existing.id },
        data: dto,
      });
    }
    return this.prisma.siteSettings.create({ data: dto });
  }
}
