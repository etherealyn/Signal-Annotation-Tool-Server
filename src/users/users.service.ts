import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
              private readonly userRepository: MongoRepository<User>) {
  }
}
