import { Module } from '@nestjs/common';
import { WathlistController } from './wathlist.controller';
import { WathlistService } from './wathlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cryptocurrency } from './entity/wathlist.entity';
import { User } from '../user/entity/user.entiy';

@Module({
  imports:[TypeOrmModule.forFeature([Cryptocurrency, User])],
  controllers: [WathlistController],
  providers: [WathlistService]
})
export class WathlistModule {}
