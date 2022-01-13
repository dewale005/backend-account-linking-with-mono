import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../Dtos/user.dto';
import { Body, Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/helpers/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async user(@Headers('Authorization') auth: string) {
    return this.usersService.showById(auth);
  }
  
}
