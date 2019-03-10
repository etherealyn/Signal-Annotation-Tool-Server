import { Module } from '@nestjs/common';
import { LabelsModule } from './labels/labels.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { UsersModule } from './users/users.module';
import { Project } from './entities/project.entity';
import { User } from './entities/user.entity';
import { Label } from './entities/label.entity';
import { Segment } from './entities/segment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'satdb',
        synchronize: true,
        logging: true,
        entities: [
          Project, User, Label, Segment,
        ],
      },
    ),
    AuthModule,
    UsersModule,
    ProjectModule,
    LabelsModule,

  ],
})
export class ApplicationModule {
}
