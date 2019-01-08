import { Body, Controller, Delete, FilesInterceptor, Get, Param, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { AuthGuard } from '@nestjs/passport';
import { Directory } from './directory.entity';
import { FileUpload } from './file.upload';
import { File } from './file.entity';

@Controller('api/projects')
export class ProjectController {

  constructor(private projectService: ProjectService) {
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Req() req, @Body() body) {
    const project = new Project();
    project.title = body.title;
    project.description = body.description;
    project.modified = new Date();
    project.ownerId = req.user.id;

    project.root = new Directory();
    project.root.parent = null;
    project.root.children = [];

    // TODO: handle errors
    const response = await this.projectService.create(project);
    return { result: response.result, id: response.insertedId };
  }

  @Post('upload/:id')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(@Param('id') id, @UploadedFiles() uploads: FileUpload[]) {

    const project = await this.projectService.findOne(id);


    uploads.forEach((upload: FileUpload) => {
      const file = new File();
      file.name = upload.originalname;
      file.path = upload.path;
      file.size = upload.size;

      project.root.children.push(file);
    });


    return await this.projectService.update(project.id.toHexString(), project);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id) {
    return await this.projectService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
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
  @UseGuards(AuthGuard())
  async delete(@Param('id') id) {
    return await this.projectService.delete(id);
  }
}
