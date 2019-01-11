import { Body, Controller, Delete, FilesInterceptor, Get, Param, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '../entities/project.entity';
import { AuthGuard } from '@nestjs/passport';
import { Directory } from '../entities/directory.entity';
import { File } from '../entities/file.entity';

interface FileUpload {
  readonly fieldname: string;
  readonly originalname: string;
  readonly encoding: string;
  readonly mimetype: string;
  readonly destination: string;
  readonly filename: string;
  readonly path: string;
  readonly size: number;
}

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

    project.fileTree = new Directory();
    project.fileTree.parent = null;
    project.fileTree.children = [];

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
      file.mimetype = upload.mimetype;

      project.fileTree.children.push(file);
    });
    return await this.projectService.update(project.id.toHexString(), project);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<Project[]> {
    const fields:(keyof Project)[] = ['id', 'title', 'modified',
      'memberIds', 'ownerId', 'description', ];
    return await this.projectService.findAll(fields);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id) {
    const project = await this.projectService.findOne(id);

    project.fileTree.children.forEach(file => {
      delete file.path;
    });

    return project;
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
