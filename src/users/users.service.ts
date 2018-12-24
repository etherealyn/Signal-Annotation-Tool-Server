import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
              private readonly userRepository: MongoRepository<User>) {
  }

  async create(userModel: UserModel) {
    const userEntity = new User();

    userEntity.username = userModel.username;
    userEntity.email = userModel.email;
    userEntity.password = hashSync(userModel.password, 8); // fixme

    return await this.userRepository.insertOne(userEntity);
  }

  async findAll() {
    return await this.userRepository.find();
  }
}
