import { TokenService } from '@core/auth/domain/services/TokenService'
import { LoginSuccessDto } from '@core/auth/shared/dto/LoginSuccess.dto'
import { User } from '@core/user/domain/interfaces/User'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class RefreshTokenUseCases {
    @Inject() private readonly tokenService: TokenService

    async refreshToken(user: User): Promise<LoginSuccessDto> {
        const accessToken: string =
            await this.tokenService.generateAccessToken(user)
        const refreshToken: string =
            await this.tokenService.generateRefreshToken(user)

        const refreshResponse: LoginSuccessDto = {
            ...user,
            accessToken,
            refreshToken,
        }

        return refreshResponse
    }
}
