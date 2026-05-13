import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TrackProjectDto } from './dto/track-project.dto';
import { TrackBlogDto } from './dto/track-blog.dto';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async trackProjectMetric(dto: TrackProjectDto) {
    return this.prisma.projectMetric.create({
      data: {
        projectId: dto.projectId,
        event: dto.event,
        visitorId: dto.visitorId,
      },
    });
  }

  async trackBlogView(dto: TrackBlogDto) {
    return this.prisma.blogView.create({
      data: {
        postId: dto.postId,
        visitorId: dto.visitorId,
        referrer: dto.referrer,
      },
    });
  }

  async getOverview() {
    const [
      totalProjects,
      totalBlogPosts,
      totalProjectViews,
      totalBlogViews,
      totalChatSessions,
      totalResumeDownloads,
    ] = await Promise.all([
      this.prisma.project.count({ where: { published: true } }),
      this.prisma.blogPost.count({ where: { published: true } }),
      this.prisma.projectMetric.count(),
      this.prisma.blogView.count(),
      this.prisma.chatSession.count(),
      this.prisma.resumeDownload.count(),
    ]);

    return {
      totalProjects,
      totalBlogPosts,
      totalProjectViews,
      totalBlogViews,
      totalChatSessions,
      totalResumeDownloads,
    };
  }

  async getDetailed() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      projectMetrics,
      blogViews,
      recentProjectMetrics,
      recentBlogViews,
      topProjects,
      topPosts,
    ] = await Promise.all([
      this.prisma.projectMetric.count(),
      this.prisma.blogView.count(),
      this.prisma.projectMetric.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.blogView.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.projectMetric.groupBy({
        by: ['projectId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),
      this.prisma.blogView.groupBy({
        by: ['postId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),
    ]);

    return {
      totals: { projectMetrics, blogViews },
      last30Days: {
        projectMetrics: recentProjectMetrics.length,
        blogViews: recentBlogViews.length,
      },
      topProjects: topProjects.map((p) => ({ projectId: p.projectId, count: p._count.id })),
      topPosts: topPosts.map((p) => ({ postId: p.postId, count: p._count.id })),
    };
  }
}
