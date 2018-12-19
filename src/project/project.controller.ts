import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('api/projects')
export class ProjectController {

  constructor(private projectService: ProjectService) {
  }

  @Post()
  async create(@Body() body) {
    const project = new Project();
    project.title = body.title;
    project.description = body.description;
    project.modified = new Date();

    // TODO: handle errors
    const response = await this.projectService.create(project);
    return { result: response.result, id: response.insertedId };
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.projectService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body) {
    const project = await this.projectService.findOne(id);

    if (body) {
      if (project) {
        for (const key of Object.keys(body)) {
          project[key] = body[key];
        }
        return await this.projectService.update(id, project);
      }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.projectService.delete(id);
  }
}
