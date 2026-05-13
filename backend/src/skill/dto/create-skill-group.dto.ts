import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillGroupDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ default: 0 })
  @IsInt()
  order: number;
}
