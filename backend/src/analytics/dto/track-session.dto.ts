import { IsString, IsOptional, IsNumber } from 'class-validator';

export class TrackSessionDto {
  @IsString()
  visitorId: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  device?: string;

  @IsOptional()
  pages?: any;

  @IsOptional()
  @IsNumber()
  duration?: number;
}
