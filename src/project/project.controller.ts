import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {

  constructor(private projectService: ProjectService) {}

  @Post()
  async create(@Body() body) {
    const project = new Project();
    project.title = body.title;
    project.description = body.description;
    project.modified = new Date();

    // TODO: handle errors
    return await this.projectService.create(project);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.projectService.findOne(id);
  }
}
