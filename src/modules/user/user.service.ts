import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {users} from "../../moks";
import { User } from './entity/user.entiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';
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
    async publicUser (email: string){
        return this.userRepository.findOne({
            select: {
                id: true,
                firstName: true,
                userName: true,
                email: true,  
                cryptocurrencies: true 
            },
            where:{email},
            relations: ['cryptocurrencies'],
            
            
        })
        
    }

    async updateUser(email: string, dto: UpdateUserDTO):Promise<UpdateUserDTO> {
        await this.userRepository.update({ email: email }, dto);
        return dto
    }

    async deleteUser(email: string): Promise<Boolean>{
        await this.userRepository.delete({email:email})
        return true
    }
}
