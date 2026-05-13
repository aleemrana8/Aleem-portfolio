import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get public profile' })
  get() {
    return this.service.get();
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile' })
  update(@Body() dto: UpdateProfileDto) {
    return this.service.update(dto);
  }
}
