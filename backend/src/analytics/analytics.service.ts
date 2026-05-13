import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TrackEventDto } from './dto/track-event.dto';
import { TrackSessionDto } from './dto/track-session.dto';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async trackEvent(data: TrackEventDto) {
    return this.prisma.analyticsEvent.create({
      data: {
        event: data.event,
        page: data.page,
        referrer: data.referrer,
        visitorId: data.visitorId,
        metadata: data.metadata,
      },
    });
  }

  async trackSession(data: TrackSessionDto) {
    const existing = await this.prisma.visitorSession.findFirst({
      where: { visitorId: data.visitorId },
      orderBy: { createdAt: 'desc' },
    });

    if (existing) {
      return this.prisma.visitorSession.update({
        where: { id: existing.id },
        data: {
          pages: data.pages,
          duration: data.duration,
          device: data.device,
        },
      });
    }

    return this.prisma.visitorSession.create({
      data: {
        visitorId: data.visitorId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        country: data.country,
        city: data.city,
        device: data.device,
        pages: data.pages,
        duration: data.duration,
      },
    });
  }

  async getDashboard() {
    const [
      totalProjects,
      totalBlogPosts,
      totalExperiences,
      totalContacts,
      totalChatSessions,
      totalEvents,
      recentEvents,
      topPages,
      recruiterLeads,
    ] = await Promise.all([
      this.prisma.project.count(),
      this.prisma.blogPost.count(),
      this.prisma.experience.count(),
      this.prisma.contactMessage.count(),
      this.prisma.chatSession.count(),
      this.prisma.analyticsEvent.count(),
      this.prisma.analyticsEvent.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      this.prisma.analyticsEvent.groupBy({
        by: ['page'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
        where: { page: { not: null } },
      }),
      this.prisma.recruiterLead.count(),
    ]);

    return {
      counts: {
        projects: totalProjects,
        blogPosts: totalBlogPosts,
        experiences: totalExperiences,
        contacts: totalContacts,
        chatSessions: totalChatSessions,
        events: totalEvents,
        recruiterLeads,
      },
      recentEvents,
      topPages: topPages.map((p) => ({ page: p.page, count: p._count.id })),
    };
  }

  async getEvents(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.analyticsEvent.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.analyticsEvent.count(),
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
}
