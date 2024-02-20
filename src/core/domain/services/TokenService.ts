import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { Token } from '../interfaces/Token'
import { User } from '../interfaces/User'
import { ConfigService } from '@nestjs/config'
import { TokenConfig } from '@infrastructure/shared/config/token.config'
import { UnauthorizedException } from '@nestjs/common'

export class TokenService {
    tokensConfig: TokenConfig = this.configService.get<TokenConfig>('token')

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async generateAccessToken(user: Partial<User>): Promise<string> {
        return await this.generateToken(
            user,
            this.tokensConfig.accessExpiration,
            this.tokensConfig.accessKey,
        )
    }

    async generateRefreshToken(user: Partial<User>): Promise<string> {
        return await this.generateToken(
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

        return await this.jwtService.signAsync(token, signOptions)
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

export const TokenServiceProvider = {
    provide: TokenService,
    useFactory: (configService: ConfigService, jwtService: JwtService) =>
        new TokenService(jwtService, configService),
    inject: [ConfigService, JwtService],
}
