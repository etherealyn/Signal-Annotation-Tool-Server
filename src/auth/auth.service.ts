import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {
  }

  async createToken(username: string, password: string) {
    let user: User = await this.usersService.findOneByUsername(username);
    if (!user) {
      user = await this.usersService.findOneByEmail(username);
    }

    if (user && password === user.password) { // fixme compareSync
      const payload: JwtPayload = { id: user.id.toHexString() };
      const accessToken = this.jwtService.sign(payload);
      delete user.password;
      return {
        accessToken,
        user,
        expiresIn: 3600
      };
    } else {
      return { error: 'Invalid username or password' };
    }
  }

  async validateUser(payload: JwtPayload) {
    const id = payload.id;
    return await this.usersService.findOneById(id);
  }
}
