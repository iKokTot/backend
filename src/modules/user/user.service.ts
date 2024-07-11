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
    async findUserByEmail(email:string): Promise<User>{
        try{
        return this.userRepository.findOne( {where:{ email: email }});
        }catch(e){
            throw new Error(e)
        }
    }
    getUsers() {
        return users;
    }
    async hashPassword(password: string): Promise<string>{
        try{
            return bcrypt.hash(password, 10)
        }catch(e){
            throw new Error(e)
        }
    }
    async createUser(dto: CreateUserDTO): Promise<User> {
        try{
            dto.password = await this.hashPassword(dto.password);
            const user = this.userRepository.create({
                firstName: dto.firstName,
                userName: dto.userName,
                email: dto.email,
                password: dto.password
            });
        return this.userRepository.save(user);
        }catch(e){
            throw new Error(e)
        }
    }
    async publicUser (email: string): Promise<User>{
        try{
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
        }catch(e){
            throw new Error(e)
        }
        
    }

    async updateUser(email: string, dto: UpdateUserDTO):Promise<UpdateUserDTO> {
        try{
        await this.userRepository.update({ email: email }, dto);
        return dto
        }catch(e){
            throw new Error(e)
        }
    }

    async deleteUser(email: string): Promise<Boolean>{
        try{
        await this.userRepository.delete({email:email})
        return true
        }catch(e){
            throw new Error(e)
        }
    }
}
