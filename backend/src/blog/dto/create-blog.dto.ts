import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  excerpt: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  published: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  featured: boolean;
}
