import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult, MongoRepository } from 'typeorm';
import { Label } from '../entities/label.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LabelsService {
  constructor(@InjectRepository(Label)
              private readonly labelRepository: MongoRepository<Label>) {
  }

  async createLabel(projectId: string, authorId: string): Promise<InsertResult> {
    const label = new Label(projectId, authorId, 'Label');
    return await this.labelRepository.insert(label);
  }

  async updateLabel(labelId: string) {
    // return await this.labelRepository.findOneAndUpdate({ labelId }, );
  }

  async getLabels(projectId: string, select?:(keyof Label)[]): Promise<Label[]> {
    return await this.labelRepository
      .find({
        select: select,
        where: { projectId: projectId },
      });
  }

  async deleteLabels(labelId: string) {
    return await this.labelRepository.delete(labelId);
  }

  async getLabel(id: string) {
    return await this.labelRepository.findOne(id);
  }

  async deleteLabel(id: string): Promise<DeleteResult> {
    return await this.labelRepository.delete(id)
  }
}
