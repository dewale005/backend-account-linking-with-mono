import { CreateUserDto } from './../../Dtos/user.dto';
import { JwtAuthGuard } from './../../helpers/jwt-auth.guard';
import { AuthLoginDto } from './../../Dtos/auth-login.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return {
      message: 'This endpoint is protected'
    }
  }
}
