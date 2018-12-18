import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { ProjectController } from './project/project.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProjectModule,
  ],
  controllers: [AppController, ProjectController],
  providers: [AppService],
})
export class AppModule {
}
