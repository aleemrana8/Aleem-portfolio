import { IsString, IsOptional, IsBoolean, IsArray, IsInt } from 'class-validator';

export class UpdateCaseStudyDto {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  heroImage?: string;

  @IsOptional()
  @IsString()
  problem?: string;

  @IsOptional()
  @IsString()
  businessContext?: string;

  @IsOptional()
  @IsString()
  solution?: string;

  @IsOptional()
  @IsString()
  architecture?: string;

  @IsOptional()
  challenges?: any;

  @IsOptional()
  @IsString()
  workflow?: string;

  @IsOptional()
  aiIntegrations?: any;

  @IsOptional()
  metrics?: any;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  stack?: string[];

  @IsOptional()
  timeline?: any;

  @IsOptional()
  lessons?: any;

  @IsOptional()
  futureWork?: any;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsInt()
  order?: number;
}
