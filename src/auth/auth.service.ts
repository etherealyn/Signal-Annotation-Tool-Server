import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { UsersService } from '../users/users.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {
  }

  async createToken(username: string, password: string) {
    let user = await this.usersService.findOneByUsername(username);

    if (!user) {
      user = await this.usersService.findOneByEmail(username);
    }

    if (user && password === user.password) {
      const payload: JwtPayload = { id: user.id.toHexString() };
      const accessToken = this.jwtService.sign(payload);
      delete user.password;
      return { accessToken, user, expiresIn: 3600 };
    }
    return { error: 'Invalid username or password' };
  }

  async validateUser(payload: JwtPayload) {
    const id = payload.id;
    return await this.usersService.findOneById(id);
  }

  private static hashSync(str: string) {
    return hashSync(str, 8);
  }
}
