import { Injectable } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { ObjectID } from 'mongodb';
import { Label } from '../entities/label.entity';
import * as hyperid from 'hyperid';

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

  async deleteLabel(projectId: string, index: number) {
    const project = await this.projectService.findOne(projectId, ['labels']);
    if (project.labels && index < project.labels.length) {
      const label = project.labels[index];

      if (label) {
        /** if there are no series in the label */
        const force = false;
        if (!label.series || label.series && label.series.length === 0 || force) {
          project.labels.splice(index, 1);
          await this.projectService.update(projectId, { labels: project.labels });
        }
      }
    }
  }

  async editLabel(projectId: string, index: number, name: string) {
    await this.projectService.findOne(projectId, ['labels'])
      .then(async (value) => {
        const labels = value.labels;
        if (labels && index < labels.length) {
          labels[index].name = name;
          await this.projectService.update(projectId, { labels });
        }
      });
  }
}
