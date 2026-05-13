import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async saveFile(file: Express.Multer.File) {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const media = await this.prisma.media.create({
      data: {
        filename: file.originalname,
        url: `/uploads/${file.filename}`,
        type: file.mimetype,
        size: file.size,
      },
    });

    return media;
  }

  async findAll() {
    return this.prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string) {
    const media = await this.prisma.media.findUnique({ where: { id } });
    if (!media) throw new NotFoundException('Media not found');

    const filePath = path.join(process.cwd(), media.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return this.prisma.media.delete({ where: { id } });
  }
}
