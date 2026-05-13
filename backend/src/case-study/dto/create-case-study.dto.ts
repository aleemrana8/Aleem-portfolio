import { IsString, IsOptional, IsBoolean, IsArray, IsNumber, IsInt } from 'class-validator';

export class CreateCaseStudyDto {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  heroImage?: string;

  @IsString()
  problem: string;

  @IsOptional()
  @IsString()
  businessContext?: string;

  @IsString()
  solution: string;

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
