import { CreateUserDto } from './../../Dtos/user.dto';
import { AuthLoginDto } from './../../Dtos/auth-login.dto';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/Models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    const payload = {
      userId: user.id,
    };

    return {
        user: user.id,
        access_token: this.jwtService.sign(payload),
      };;
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
    };

    return {
      user: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.userService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
