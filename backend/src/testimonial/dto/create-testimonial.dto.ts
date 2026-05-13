import { IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  featured: boolean;

  @ApiProperty({ default: 0 })
  @IsInt()
  order: number;
}
