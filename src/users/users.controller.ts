import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRegistrationDto } from '../dto/user.registration.dto';
import { UserModel } from './user.model';
import { Response } from 'express';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post()
  async create(@Body() userDto: UserRegistrationDto, @Res() res: Response) {
    if (UsersController.isValidUserDto(userDto)) {
      bcrypt.hash(userDto.password, 10, async (err, hash) => {
        if (err) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
        const user = new UserModel(userDto.username, userDto.email, hash);
        await this.usersService.create(user)
          .then(value => {
              if (value.result.n === 1 && value.result.ok === 1) {
                res.status(HttpStatus.OK)
                  .json({ success: true })
                  .send();
              } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
              }
            },
            reason => {
              if (reason.code === 11000) {
                res.status(HttpStatus.CONFLICT).send();
              } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
              }
            });
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  private static isValidUserDto(userDto: UserRegistrationDto) {
    if (userDto) {
      if (userDto.username) {
        if (userDto.username.length >= 3 && userDto.username.length <= 26) {
          return true;
        }
      } else {
        return false;
      }

      if (userDto.email) {
        if (userDto.email.split('@').length === 2) {
          return true;
        }
      }

      if (userDto.password) {
        return 9 <= userDto.password.length && userDto.password.length <= 64;
      } else {
        return false;
      }
    }
    return false;
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    users.map((user: User) => {
      delete user.password;
    });

    return users;
  }

  @Delete(':id')
  async delete(@Param('id') email, @Res() res) {
    return res.statusCode(HttpStatus.NOT_IMPLEMENTED);
  }
}
