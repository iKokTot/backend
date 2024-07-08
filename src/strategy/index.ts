import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ignoreElements } from "rxjs";

@Injectable()
export class JwtStraregy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('secret_jwt')
        })
    }
    async validate(payload:any){
        return {...payload.user}
    }
}