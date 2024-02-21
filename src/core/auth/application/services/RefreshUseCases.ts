import { Token } from '@core/auth/domain/interfaces/Token'
import { TokenService } from '@core/auth/domain/services/TokenService'
import { LoginSuccessDto } from '@core/auth/shared/dto/LoginSuccess.dto'
import { User } from '@core/user/domain/interfaces/User'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RefreshTokenUseCases {
    constructor(private tokenService: TokenService) {}

    async refreshToken(user: Token): Promise<LoginSuccessDto> {
        const _user: Partial<User> = {
            id: user.sub,
            firstName: user.username,
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
