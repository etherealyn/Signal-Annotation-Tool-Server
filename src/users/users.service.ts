import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { FindOneOptions, MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';

// import * as mongodb from 'mongodb';


@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
              private readonly userRepository: MongoRepository<User>) {
  }

  async create(model: UserModel) {
    const entity = new User();

    entity.username = model.username;
    entity.email = model.email;
    entity.password = model.password;

    return await this.userRepository.insertOne(entity);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({email});
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOne({username});
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne(id);
  }
}
