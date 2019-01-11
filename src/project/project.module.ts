import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { Project } from '../entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { PassportModule } from '@nestjs/passport';
import { Directory } from '../entities/directory.entity';
import { File } from '../entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, File, Directory]),
    PassportModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {
}
