import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './src/modules/user/entity/user.entiy'; 
import { Cryptocurrency } from 'src/modules/wathlist/entity/wathlist.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Cryptocurrency],
  migrations: [__dirname + '/src/migration/*{.ts,.js}'],
  synchronize: false,
});
