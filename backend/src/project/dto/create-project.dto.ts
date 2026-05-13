import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  tagline: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  problem?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  solution?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  outcome?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  stack: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  githubUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  liveUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  featured: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  published: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  archived: boolean;
}
