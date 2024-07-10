import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class WathlistDTO{
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    assetID: string
}