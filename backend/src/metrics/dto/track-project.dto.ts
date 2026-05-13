import { IsString, IsOptional } from 'class-validator';

export class TrackProjectDto {
  @IsString()
  projectId: string;

  @IsString()
  event: string;

  @IsOptional()
  @IsString()
  visitorId?: string;
}
