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
import { Directory } from '../entities/directory.sub';
import { File } from '../entities/file.sub';
import { createReadStream, Stats, statSync } from 'fs';
import { Request, Response } from 'express';
import * as csv from 'csv';

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

@Controller('api/project')
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
    project.memberIds = [];

    project.fileTree = new Directory();
    project.fileTree.parent = null;
    project.fileTree.children = [];

    const response = await this.projectService.create(project);
    return { result: response.result, id: response.insertedId };
  }

  @Post('upload/:id')
  @UseGuards(AuthGuard())
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

  @Get('all/:ownerId')
  @UseGuards(AuthGuard())
  async findAll(@Param('ownerId') ownerId): Promise<Project[]> {
    return await this.projectService.findAll(ownerId);
  }

  // @Get('labels/csv/:projectId')
  // @UseGuards(AuthGuard())
  // async getLabelsCsv(@Param('projectId') projectId, @Res() res) {
  //   const project = await this.projectService.findOne(projectId, ['labels']);
  //   const labels = project.labels;
  //
  //   if (labels) {
  //     let responseCsv = 'labelName,startTime,endTime\n';
  //
  //     labels.forEach(label => {
  //       if (label.series) {
  //         label.series.forEach(range => {
  //           responseCsv += `${label.name},${range.startTime},${range.endTime}\n`;
  //         });
  //       }
  //     });
  //
  //     res.setHeader('Content-Disposition', 'attachment; filename="labels.csv"');
  //     res.set('Access-Control-Expose-Headers', 'Content-Disposition');
  //     res.set('Content-Type', 'text/csv');
  //     res.status(200);
  //     res.send(responseCsv);
  //   }
  // }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id) {
    const project: Project = await this.projectService.findOne(id);
    if (project) {
      project.fileTree.children.forEach(file => {
        delete file.path;
      });
      return project;
    }
  }

  @Get('files/:filename')
  // @UseGuards(AuthGuard()) fixme
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
      const file = createReadStream(path, { start, end });
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

  @Delete('files/:projectID/:fileID')
  @UseGuards(AuthGuard())
  async deleteFile(@Param('projectID') projectID, @Param('fileID') fileID) {
    await this.projectService.deleteFile(projectID, fileID);
  }
}
