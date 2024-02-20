import { Token } from '@core/domain/interfaces/Token'
import { User } from '@core/domain/interfaces/User'
import { TokenService } from '@core/domain/services/TokenService'
import { LoginSuccessDto } from '@core/shared/dto/LoginSuccess.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RefreshTokenUseCases {
    constructor(private tokenService: TokenService) {}

    async refreshToken(user: Token): Promise<LoginSuccessDto> {
        const _user: Partial<User> = {
            id: user.sub,
            ...user,
        }
        const accessToken: string =
            await this.tokenService.generateAccessToken(_user)
        const refreshToken: string =
            await this.tokenService.generateRefreshToken(_user)

        const refreshResponse: LoginSuccessDto = {
            accessToken,
            refreshToken,
        }

        return refreshResponse
    }
}

export const RefreshTokenUseCasesProvider = {
    provide: RefreshTokenUseCases,
    useFactory: (tokenService: TokenService) =>
        new RefreshTokenUseCases(tokenService),
    inject: [TokenService],
}
