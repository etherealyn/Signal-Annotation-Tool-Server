import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { FindConditions, FindManyOptions, FindOneOptions, MongoRepository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>) {
  }

  async findAll(ownerId: string): Promise<Project[]> {
    const result: Project[] = await this.projectRepository.find();

    return result.filter((value => value.ownerId == ownerId)); // fixme: where clause
    // return result;
  }

  async create(project: Project) {
    return await this.projectRepository.insertOne(project);
  }

  async findOne(id: string, fields?: Array<keyof Project>) {
    const options: FindOneOptions = { select: fields };
    return await this.projectRepository.findOne(id, options);
  }

  async update(id: string, project: Project) {
    return await this.projectRepository.update(id, project);
  }

  async delete(id: string) {
    return await this.projectRepository.delete(id);
  }
}
