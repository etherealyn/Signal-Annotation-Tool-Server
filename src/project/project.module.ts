import { Module, MulterModule } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { Project } from '../entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register({
      dest: 'uploads/',
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {
}
