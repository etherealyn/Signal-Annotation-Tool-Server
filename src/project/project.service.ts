import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { FindManyOptions, FindOneOptions, MongoRepository, ObjectID, Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>) {
  }

  async findAll(fields?:(keyof Project)[]): Promise<Project[]> {
    const options: FindManyOptions = { select: fields };
    return await this.projectRepository.find(options);
  }

  async create(project: Project) {
    return await this.projectRepository.insertOne(project);
  }

  async findOne(id: string, fields?:(keyof Project)[]) {
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
