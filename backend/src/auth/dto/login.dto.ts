import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'aleem811' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'aleem811' })
  @IsString()
  @MinLength(4)
  password: string;
}
