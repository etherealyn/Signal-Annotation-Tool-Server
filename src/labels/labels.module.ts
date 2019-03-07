import { Module } from '@nestjs/common';
import { LabelsGateway } from './labels.gateway';
import { LabelsService } from './labels.service';
import { Label } from '../entities/label.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  providers: [LabelsGateway, LabelsService],
})
export class LabelsModule {
}
