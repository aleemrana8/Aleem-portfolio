import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  siteName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  siteDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  primaryFont?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  themeMode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  primaryColor?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  enableBlog?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  enableContact?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  maintenanceMode?: boolean;
}
