import {Module, MulterModule} from '@nestjs/common';
import {LabelsModule} from './labels/labels.module';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectModule} from './project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'satdb',
        synchronize: true,
        logging: false,
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
        ],
        subscribers: [
          __dirname + '/**/*.entity{.ts,.js}',
        ],
        migrations: [
          __dirname + '/**/*.entity{.ts,.js}',
        ],
        cli: {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber',
        },
      },
    ),
    AuthModule,
    ProjectModule,
    LabelsModule,
    MulterModule.register({
      dest: 'uploads/',
    }),
  ],
})
export class ApplicationModule {
}
