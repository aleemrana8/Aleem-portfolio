import { IsString, IsOptional } from 'class-validator';

export class GenerateResumeDto {
  @IsString()
  roleType: string;

  @IsOptional()
  @IsString()
  visitorId?: string;
}
