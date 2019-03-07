import { Module, MulterModule } from '@nestjs/common';
import { LabelsModule } from './labels/labels.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';

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
          'dist/**/*.entity{.ts,.js}',
        ],
      },
    ),
    // TypeOrmModule.forRoot(),
    AuthModule,
    ProjectModule,
    LabelsModule,
    MulterModule.register({
      dest: './uploads/',
    }),
  ],
})
export class ApplicationModule {
}
