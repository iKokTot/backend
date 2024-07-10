import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entiy'
import { Cryptocurrency } from '../wathlist/entity/wathlist.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Cryptocurrency])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
