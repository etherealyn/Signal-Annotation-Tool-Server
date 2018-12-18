import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { MongoRepository, Repository } from 'typeorm';

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
}
