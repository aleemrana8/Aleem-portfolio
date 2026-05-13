import { IsString, IsOptional } from 'class-validator';

export class TrackEventDto {
  @IsString()
  event: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  referrer?: string;

  @IsOptional()
  @IsString()
  visitorId?: string;

  @IsOptional()
  metadata?: any;
}
