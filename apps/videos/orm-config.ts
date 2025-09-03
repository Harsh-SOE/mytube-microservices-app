import { DataSource, DataSourceOptions } from 'typeorm';
import { VideoSchema } from './src/database/schema/video.schema';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config({ path: 'envs/.env.video' });

const configService = new ConfigService();

// console.log(process.env);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  database: configService.getOrThrow('DB_NAME'),
  username: configService.getOrThrow('DB_USER'),
  password: configService.getOrThrow('DB_PASSWORD'),
  synchronize: false,
  migrations: ['apps/videos/migrations/**'],
  entities: [VideoSchema],
};

export const dataSource = new DataSource(dataSourceOptions);
