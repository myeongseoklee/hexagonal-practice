import { BoardOrmEntity } from './../../board/adaptor/out-persistence/board.orm-entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as env from 'dotenv';

env.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  namingStrategy: new SnakeNamingStrategy(),
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [BoardOrmEntity],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
