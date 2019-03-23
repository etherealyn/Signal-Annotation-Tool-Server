import { Project } from './src/entities/project.entity';
import { User } from './src/entities/user.entity';
import { Label } from './src/entities/label.entity';
import { Segment } from './src/entities/segment.entity';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = process.env;

const expressPort: number = env.SAT_EXPRESS_PORT ? Number(env.SAT_EXPRESS_PORT) : 3000;
const origins: string = env.SAT_CORS ? env.SAT_CORS : 'http://localhost:4200';
const multerDest: string = env.SAT_MULTER_DEST ? env.SAT_MULTER_DEST : 'uploads/';

const databaseHost: string = env.SAT_DB_HOST ? env.SAT_DB_HOST : 'localhost';
const databasePort: number = env.SAT_DB_PORT ? Number(env.SAT_DB_PORT) : 27017;
const databaseUsername: string = env.SAT_DB_USERNAME ? env.SAT_DB_USERNAME : '';
const databasePassword: string = env.SAT_DB_PASSWORD ? env.SAT_DB_PASSWORD : '';
const databaseName: string = env.SAT_DB_DATABASE ? env.SAT_DB_DATABASE : 'satdb';

const ormConfig: TypeOrmModuleOptions | MongoConnectionOptions = {
  type: 'mongodb',
  host: databaseHost,
  port: databasePort,
  database: databaseName,
  username: databaseUsername,
  password: databasePassword,
  synchronize: true,
  logging: true,
  entities: [ Project, User, Label, Segment ],
  keepConnectionAlive: true,
};

export const config = {
  expressPort,
  origins,
  multerDest,
  apiKeyExpiresIn: 8 * 60 * 60,
  typeOrmConfig: ormConfig,
};
