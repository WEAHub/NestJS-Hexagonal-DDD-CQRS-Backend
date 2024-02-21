import { AuthService } from '@core/auth/domain/services/AuthService'
import { TokenService } from '@core/auth/domain/services/TokenService'
import { LoginDto } from '@core/auth/shared/dto/Login.dto'
import { LoginSuccessDto } from '@core/auth/shared/dto/LoginSuccess.dto'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { PasswordService } from '@core/shared/domain/services/PasswordService'
import { User } from '@core/user/domain/interfaces/User'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LoginUseCases {
    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private passwordService: PasswordService,
    ) {}

    async login(user: LoginDto): Promise<LoginSuccessDto> {
        const _user: User = await this.authService.checkUser(user)
        const passwordMatch: boolean = await this.passwordService.verify(
            user.password,
            _user.password,
        )

        if (!passwordMatch) {
            throw new ValidationException(
                `Password invalid for User(email=${user.email})`,
            )
        }

        const accessToken: string =
            await this.tokenService.generateAccessToken(_user)
        const refreshToken: string =
            await this.tokenService.generateRefreshToken(_user)

        const loginResponse: LoginSuccessDto = {
            accessToken,
            refreshToken,
        }

        return loginResponse
    }
}
