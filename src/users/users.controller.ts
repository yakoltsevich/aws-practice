import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as userEntity from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto): userEntity.User {
    // minimal inline validation to avoid empty values
    if (!dto || typeof dto.name !== 'string' || typeof dto.email !== 'string') {
      // In a real app, we'd use class-validator and ValidationPipe
      throw new BadRequestException('Invalid payload');
    }
    return this.usersService.create(dto);
  }

  @Get()
  findAll(): userEntity.User[] {
    return this.usersService.findAll();
  }
}
