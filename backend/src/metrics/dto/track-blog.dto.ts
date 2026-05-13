import { IsString, IsOptional } from 'class-validator';

export class TrackBlogDto {
  @IsString()
  postId: string;

  @IsOptional()
  @IsString()
  visitorId?: string;

  @IsOptional()
  @IsString()
  referrer?: string;
}
