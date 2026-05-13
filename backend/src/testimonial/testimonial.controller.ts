import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Get()
  @ApiOperation({ summary: 'Get all testimonials' })
  findAll(@Query('featured') featured?: string) {
    const featuredFilter = featured === 'true' ? true : featured === 'false' ? false : undefined;
    return this.testimonialService.findAll(featuredFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial by ID' })
  findOne(@Param('id') id: string) {
    return this.testimonialService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create testimonial' })
  create(@Body() dto: CreateTestimonialDto) {
    return this.testimonialService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update testimonial' })
  update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonialService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete testimonial' })
  delete(@Param('id') id: string) {
    return this.testimonialService.delete(id);
  }
}
