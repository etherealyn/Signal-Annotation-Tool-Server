import { Injectable } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { ObjectID } from 'mongodb';
import { Label } from '../entities/label.entity';
import * as hyperid from 'hyperid';
import { UpdateResult } from 'typeorm';

@Injectable()
export class LabelsService {
  instance = hyperid();

  constructor(
    private projectService: ProjectService) {
  }

  async createLabel(authorId: ObjectID, projectId: ObjectID): Promise<true | false> {
    const project = await this.projectService.findOne(projectId, ['id', 'labels']);
    if (!project.labels) {
      project.labels = [];
    }
    const label = new Label(`Label ${project.labels.length + 1}`);
    label.id = this.instance();
    project.labels.push(label);
    return await this.projectService
      .update(projectId, project)
      .then(() => true,
        () => false,
      );
  }

  async getLabels(projectId: string): Promise<Label[]> {
    const project = await this.projectService.findOne(projectId, ['labels']);
    return project.labels;
  }

  async deleteLabel(projectId: string, labelId: string) {
    const project = await this.projectService.findOne(projectId, ['labels']);
    if (project && project.labels) {
      const labels = project.labels;
      const index = labels.findIndex(x => x.id === labelId);
      if (index && 0 <= index) {
        // const series = labels[index].series;
        // if (!series || series && series.length === 0) {
        //   console.log('delete label');
        labels.splice(index);
        await this.projectService.update(projectId, { labels });
        // } else {
        //   console.log('cant delete');
        // todo can't delete labels with recorded ranges
        // todo notify user
        // }
      }

    }
  }

  async editLabel(projectId: string, labelId: string, name: string): Promise<UpdateResult> {
    return await this.projectService.findOne(projectId, ['labels'])
      .then(async (project) => {
        const labels = project.labels;
        const index = labels.findIndex(x => x.id === labelId);
        if (index !== -1) {
          labels[index].name = name;
          return await this.projectService.update(projectId, { labels });
        }
      });
  }
}

