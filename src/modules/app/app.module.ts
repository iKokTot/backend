import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entiy';
import configurations from 'src/configurations';
import { AuthModule } from '../auth/auth.module';

import { TokenModule } from '../token/token.module';
import { WathlistModule } from '../wathlist/wathlist.module';
import { Cryptocurrency } from '../wathlist/entity/wathlist.entity';

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
      entities: [User, Cryptocurrency],
      migrations: [__dirname + '/src/migration/*{.ts,.js}'],
      synchronize: false,
    }),
  }),
  UserModule,
  AuthModule,
  TokenModule,
  WathlistModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
