import { Controller, Get, Post, Body } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { TrackProjectDto } from './dto/track-project.dto';
import { TrackBlogDto } from './dto/track-blog.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Public()
  @Post('project')
  trackProject(@Body() dto: TrackProjectDto) {
    return this.metricsService.trackProjectMetric(dto);
  }

  @Public()
  @Post('blog')
  trackBlog(@Body() dto: TrackBlogDto) {
    return this.metricsService.trackBlogView(dto);
  }

  @Public()
  @Get('overview')
  getOverview() {
    return this.metricsService.getOverview();
  }

  @Get('detailed')
  getDetailed() {
    return this.metricsService.getDetailed();
  }
}
