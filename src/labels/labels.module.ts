import { Module } from '@nestjs/common';
import { ProjectModule } from '../project/project.module';
import { LabelsService } from './labels.service';
import { LabelsGateway } from './labels.gateway';

@Module({
  imports: [
    ProjectModule,
  ],
  providers: [LabelsService, LabelsGateway],
  exports: [LabelsService],
})
export class LabelsModule {}
