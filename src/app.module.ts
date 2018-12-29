import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { ProjectController } from './project/project.controller';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProjectModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, ProjectController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {
}
