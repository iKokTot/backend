import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WathlistService } from './wathlist.service';
import { WathlistDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UserService } from '../user/user.service';
import { CreateAssetResponse, RemoveAssetFromUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('wathlist')
export class WathlistController {
    constructor (private readonly wathlistSerwice: WathlistService,){}

    @ApiTags('API')
    @ApiResponse({status: 201, type: CreateAssetResponse})
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDto: WathlistDTO, @Req() request): Promise<CreateAssetResponse>{
        const user = request.user
        return this.wathlistSerwice.createAsset(user, assetDto)
    }

    @Get('get-all')
    getAllAssets(){
        return this.wathlistSerwice.getAllAsset()
    }

    @Patch('update')
    updateAsset(@Body() dto: WathlistDTO){
        return 
    }

    @ApiTags('API')
    @ApiResponse({status:200, type: RemoveAssetFromUserResponse})
    @UseGuards(JwtAuthGuard)
    @Delete('remove-asset')
    async removeAssetFromUser(@Query('id') id: number, @Req() request): Promise<RemoveAssetFromUserResponse> {
        console.log(id)
        const user = request.user;
        return this.wathlistSerwice.removeAssetFromUser(user.email, id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add-asset-for-user')
    addAssetForUser(@Body('id') id: number, @Req() request){
       
        const user = request.user
        return this.wathlistSerwice.addAssetForUser(id, user)
    }

}
