import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
