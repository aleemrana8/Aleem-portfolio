import { IsString, IsBoolean, IsOptional, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  current: boolean;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  bullets: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
