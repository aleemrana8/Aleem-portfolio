import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Submit contact message (public, rate limited)' })
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all contact messages (admin)' })
  findAll() {
    return this.contactService.findAll();
  }

  @Patch(':id/read')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark message as read' })
  markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete contact message' })
  delete(@Param('id') id: string) {
    return this.contactService.delete(id);
  }
}
