import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional() @IsString() @IsOptional() name?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() headline?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() subheadline?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() summary?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() email?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() phone?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() location?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() avatarUrl?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() resumeUrl?: string;
  @ApiPropertyOptional() @IsUrl({}, { each: false }) @IsOptional() githubUrl?: string;
  @ApiPropertyOptional() @IsUrl({}, { each: false }) @IsOptional() linkedinUrl?: string;
  @ApiPropertyOptional() @IsUrl({}, { each: false }) @IsOptional() instagramUrl?: string;
}
