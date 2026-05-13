import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll(options: {
    page?: number;
    limit?: number;
    published?: boolean;
    search?: string;
  }) {
    const { page = 1, limit = 10, published, search } = options;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (published !== undefined) where.published = published;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  async findOne(id: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  async create(dto: CreateBlogDto) {
    return this.prisma.blogPost.create({
      data: dto,
      include: { category: true },
    });
  }

  async update(id: string, dto: UpdateBlogDto) {
    await this.findOne(id);
    return this.prisma.blogPost.update({
      where: { id },
      data: dto,
      include: { category: true },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
