import { Injectable } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { ObjectID } from 'mongodb';
import { Label } from '../entities/label.sub';

@Injectable()
export class LabelsService {
  constructor(private projectService: ProjectService) {

  }

  async createLabel(authorId: ObjectID, projectId: ObjectID): Promise<true | false> {
    const project = await this.projectService.findOne(projectId, ['id', 'labels']);
    if (!project.labels) {
      project.labels = [];
    }
    const name = `Label ${project.labels.length + 1}`;
    project.labels.push(new Label(name));
    return await this.projectService.update(projectId, project).then(() => true, () => false);
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
}
