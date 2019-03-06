import { Module } from '@nestjs/common';
import { LabelsGateway } from './labels.gateway';

@Module({
  providers: [LabelsGateway],
})
export class LabelsModule {}
