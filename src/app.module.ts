import { Module, MulterModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { ProjectController } from './project/project.controller';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { LabelsGateway } from './labels/labels.gateway';
import { LabelsModule } from './labels/labels.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        host: 'localhost',
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
    ProjectModule,
    UsersModule,
    AuthModule,
    MulterModule.register({
      dest: 'uploads/',
    }),
    LabelsModule,
  ],
  controllers: [AppController, ProjectController, AuthController],
  providers: [AppService, AuthService, LabelsGateway],
})
export class AppModule {
}
