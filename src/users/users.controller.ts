import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { hash, hashSync } from 'bcrypt';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post()
  async create(@Body() user) {
    const username = user.username;
    const email = user.email;
    const encrypted = hashSync(user.password, 8);
    return {username, email, isEncrypted: !!encrypted};
  }
}
