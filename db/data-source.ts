import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Entities } from 'src/entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('dbUsername'),
      database: configService.get<string>('dbName'),
      password: configService.get<string>('dbPassword'),
      // entities: ['dist/**/*.entity.js'],
      // This does not work. Webpack bundles to memory; no file system, globs don’t resolve
      entities: Object.values(Entities),
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
