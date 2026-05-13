import { IsString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ minimum: 1, maximum: 100 })
  @IsInt()
  @Min(1)
  @Max(100)
  level: number;

  @ApiProperty()
  @IsString()
  groupId: string;
}
