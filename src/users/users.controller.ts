import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import { User } from './user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post()
  async create(@Body() model: UserModel, @Res() res) {
    return await this.usersService.create(model)
      .catch(((reason) => {
        if (reason.code === 11000) {
          return res.status(HttpStatus.BAD_REQUEST).json({ error: 11000, message: 'A user with such details exist.' });
        } else {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }));
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    users.map((user: User) => {
      delete user.id;
      delete user.password;
    });

    return users;
  }

  @Delete(':email')
  async delete(@Param('email') email, @Res() res) {
    return res.statusCode(HttpStatus.NOT_IMPLEMENTED);
  }
}
