import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { Cryptocurrency } from './entity/wathlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/moks';
import { WathlistDTO } from './dto';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entiy';
import { UpdateUserDTO } from '../user/dto';
import { CreateAssetResponse, RemoveAssetFromUserResponse } from './response';

@Injectable()
export class WathlistService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Cryptocurrency)
        private readonly wathlistRepository: Repository<Cryptocurrency>){}

    async createAsset(user, dto):Promise<CreateAssetResponse>{
        const wathlist = {
            users: user.id,
            name: dto.name,
            assetId: dto.assetID
        }
        await this.wathlistRepository.create(wathlist)
        return this.wathlistRepository.save(wathlist)
    }
    async getAllAsset(){
            return this.wathlistRepository.find()
    }
    async updateAsset(dto: WathlistDTO){
        return   
    }
    async addAssetForUser( id: number, user:UpdateUserDTO){
        const Asset = await this.wathlistRepository.findOne({where: {id:id}})
        const User = await this.userRepository.findOne({
            where:{email:user.email},
            relations: ['cryptocurrencies'] 
        })
        if (!User || !Asset){
            throw new Error("User or Cryptocurrency not found")
        }
        User.cryptocurrencies.push(Asset)
        return this.userRepository.save(User)
    }

    async removeAssetFromUser(email: string, assetId: number): Promise<RemoveAssetFromUserResponse> {
        const user = await this.userRepository.findOne({ 
            select: {
                id: true,
                firstName: true,
                userName: true,
                email: true,  
                cryptocurrencies: true 
            },
            where: { email },
            relations: ['cryptocurrencies'],
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const asset = await this.wathlistRepository.findOne({ where: { id: assetId } });
        if (!asset) {
            throw new NotFoundException('Cryptocurrency not found');
        }
        
        console.log(asset)
        console.log(user.cryptocurrencies)
        user.cryptocurrencies = user.cryptocurrencies.filter(c => c.id != assetId);
        console.log(user.cryptocurrencies)
        return this.userRepository.save(user);
    }
}
