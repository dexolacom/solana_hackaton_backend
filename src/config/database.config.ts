import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const sslProd = {
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

let ssl = {};

if (process.env.NODE_ENV === 'production') {
  ssl = sslProd;
}
const config = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: true,
  logging: process.env.NODE_ENV === 'production' ? ['error'] : true,
  ...ssl,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
