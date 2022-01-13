import { CreateUserDto } from '../../Dtos/user.dto';
import { User } from '../../Models/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(private jwtService: JwtService){}

  async showById(id: string): Promise<User> {
    const jwt = id.replace('Bearer ', '');
    let token_data = await this.jwtService.decode(jwt);
    const user = await this.findById(token_data['userId']);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
