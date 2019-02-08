import {
  Body,
  Controller,
  Delete,
  FilesInterceptor,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '../entities/project.entity';
import { AuthGuard } from '@nestjs/passport';
import { Directory } from '../entities/directory.entity';
import { File } from '../entities/file.entity';
import { createReadStream, Stats, statSync } from 'fs';
import { Request, Response } from 'express';

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
      file.filename = upload.filename;
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
    const fields: Array<keyof Project> = ['id', 'title', 'modified',
      'memberIds', 'ownerId', 'description' ];
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

  @Get('files/:filename')
  file(@Req() req: Request, @Res() res: Response, @Param('filename') filename: string) {
    const path = `uploads/${filename}`;
    const stat: Stats = statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunckSize = (end - start) + 1;
      const file = createReadStream(path, {start, end});
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunckSize,
        'Content-Type': 'video/mp4', // fixme
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      createReadStream(path).pipe(res);
    }
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
