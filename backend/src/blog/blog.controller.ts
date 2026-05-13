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
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ApiOperation({ summary: 'Get all blog posts (paginated)' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('published') published?: string,
    @Query('search') search?: string,
  ) {
    return this.blogService.findAll({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      published: published === 'true' ? true : published === 'false' ? false : undefined,
      search,
    });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get blog post by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create blog post' })
  create(@Body() dto: CreateBlogDto) {
    return this.blogService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog post' })
  update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog post' })
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
