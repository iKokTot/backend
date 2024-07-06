import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configurations from 'src/configurations';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configurations]
  }), 
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('db_host'),
      port: configService.get<number>('db_port'),
      username: configService.get<string>('db_user'),
      password: configService.get<string>('db_password'),
      database: configService.get<string>('db_name'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  }),
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
