import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { Token } from '../interfaces/Token'
import { ConfigService } from '@nestjs/config'
import { Provider, UnauthorizedException } from '@nestjs/common'
import { User } from '@core/user/domain/interfaces/User'
import { TokenServicePort } from '../ports/inbound/services/TokenService.service.port'
import { TokenConfig } from '@config/token.config'

export class TokenService implements TokenServicePort {
    tokensConfig: TokenConfig = this.configService.get<TokenConfig>('token')

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async generateAccessToken(user: User): Promise<string> {
        return this.generateToken(
            user,
            this.tokensConfig.accessExpiration,
            this.tokensConfig.accessKey,
        )
    }

    async generateRefreshToken(user: User): Promise<string> {
        return this.generateToken(
            user,
            this.tokensConfig.refreshExpiration,
            this.tokensConfig.refreshKey,
        )
    }

    private async generateToken(
        user: Partial<User>,
        expiration: string,
        key: string,
    ): Promise<string> {
        const token: Token = {
            sub: user.id,
            username: user.firstName,
            email: user.email,
        }

        const signOptions: JwtSignOptions = {
            expiresIn: expiration,
            secret: key,
        }

        return this.jwtService.signAsync(token, signOptions)
    }

    async verify(token: string, secret: string): Promise<Token> {
        try {
            const payload: Token = await this.jwtService.verify(token, {
                secret,
            })
            return payload
        } catch {
            throw new UnauthorizedException()
        }
    }
}

export const TokenServiceProvider: Provider = {
    provide: TokenService,
    useFactory: (configService: ConfigService, jwtService: JwtService) =>
        new TokenService(jwtService, configService),
    inject: [ConfigService, JwtService],
}
