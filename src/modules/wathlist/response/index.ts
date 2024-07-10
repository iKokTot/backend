import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsObject, IsString } from "class-validator"

export class CreateAssetResponse {
    @ApiProperty()
    @IsNumber()
    users: number

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    assetId: string

    @ApiProperty()
    @IsNumber()
    id: number
}

export class RemoveAssetFromUserResponse {
    @ApiProperty()
    @IsNumber()
    id: number

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsObject()
    cryptocurrencies: object
}