import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {users} from "../../moks";
import { User } from './entity/user.entiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>){

    }
    async findUserByEmail(email:string){
        return this.userRepository.findOne( {where:{ email: email }});
    }
    getUsers() {
        return users;
    }
    async hashPassword(password){
        return bcrypt.hash(password, 10)
    }
    async createUser(dto: CreateUserDTO): Promise<User> {
        
        dto.password = await this.hashPassword(dto.password);
        const user = this.userRepository.create({
            firstName: dto.firstName,
            userName: dto.userName,
            email: dto.email,
            password: dto.password
        });
        return this.userRepository.save(user);
    }
}
