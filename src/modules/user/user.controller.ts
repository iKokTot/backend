import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/index';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { request } from 'http';
import { use } from 'passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get('get-all-users')
    getUsers() {
        return this.userService.getUsers();
    }

    @ApiTags("API")
    @ApiResponse({status: 200, type: UpdateUserDTO})
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() dateDTO : UpdateUserDTO, @Req() request):Promise<UpdateUserDTO>{
        const user = request.user
        console.log(user)
        return this.userService.updateUser(user.email, dateDTO)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request): Promise<Boolean>{
        const user = request.user
        return this.userService.deleteUser(user.email)

    }
}
