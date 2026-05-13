import { IsString, IsOptional } from 'class-validator';

export class ChatDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsString()
  visitorId: string;

  @IsOptional()
  @IsString()
  mode?: string;
}
