import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { MongoRepository, ObjectID, Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>) {
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async create(project: Project) {
    return await this.projectRepository.insertOne(project);
  }

  async findOne(id: string) {
    return await this.projectRepository.findOne(id);
  }

  async update(id: string, project: Project) {
    return await this.projectRepository.update(id, project);
  }

  async delete(id: string) {
    return await this.projectRepository.delete(id);
  }
}
