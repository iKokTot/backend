import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";


class UserResponse {
    @ApiProperty()
    @IsNumber()
    id: number
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    userName: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsObject()
    cryptocurrencies: object 
}

export class AuthUserResponse{
    @ApiProperty()
    user: UserResponse

    @ApiProperty()
    @IsString()
    token: string
}

