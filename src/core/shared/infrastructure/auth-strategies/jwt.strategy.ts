import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TokenConfig } from 'src/config/token.config'
import { QueryBus } from '@nestjs/cqrs'
import { Token } from '@core/auth/domain/interfaces/Token'
import { GetUserQuery } from '@core/user/domain/queries/GetUserQuery'
import { User } from '@core/user/domain/interfaces/User'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        protected configService: ConfigService,
        protected queryBus: QueryBus,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<TokenConfig>('token').accessKey,
        })
    }

    async validate(payload: Token): Promise<User> {
        const { sub: id } = payload
        const user: User = await this.queryBus.execute(new GetUserQuery(id))
        return user
    }
}
