import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';
import { TrackSessionDto } from './dto/track-session.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Public()
  @Post('event')
  trackEvent(@Body() dto: TrackEventDto) {
    return this.analyticsService.trackEvent(dto);
  }

  @Public()
  @Post('session')
  trackSession(@Body() dto: TrackSessionDto) {
    return this.analyticsService.trackSession(dto);
  }

  @Get('dashboard')
  getDashboard() {
    return this.analyticsService.getDashboard();
  }

  @Get('events')
  getEvents(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.analyticsService.getEvents(
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    );
  }
}
