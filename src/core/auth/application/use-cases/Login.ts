import { TokenService } from '@core/auth/domain/services/TokenService'
import { LoginDto } from '@core/auth/shared/dto/Login.dto'
import { LoginSuccessDto } from '@core/auth/shared/dto/LoginSuccess.dto'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { PasswordService } from '@core/shared/domain/services/PasswordService'
import { User } from '@core/user/domain/interfaces/User'
import { Inject, Injectable } from '@nestjs/common'
import { AuthRepository } from '@core/auth/domain/ports/outbound/repositories/AuthRepository'
import { AUTH_REPOSITORY } from '@core/auth/shared/dependency-tokens/repositories'
import { ApplicationException } from '@core/shared/exception/ApplicationException'
import { Auth } from '@core/auth/domain/Auth'
import { AuthFactory } from '@core/auth/domain/AuthFactory'

@Injectable()
export class LoginUseCases {
    @Inject(AUTH_REPOSITORY) private readonly repository: AuthRepository
    @Inject() private readonly tokenService: TokenService
    @Inject() private readonly passwordService: PasswordService
    @Inject() private readonly authFactory: AuthFactory

    async login(user: LoginDto): Promise<LoginSuccessDto> {
        const userAuth: Auth = this.authFactory.create(user)

        const _user: User = await this.repository.findByEmail(
            userAuth.email.getValue(),
        )

        if (!_user) {
            throw new ApplicationException(
                `User(email=${user.email}) Not found`,
            )
        }

        const passwordMatch: boolean = await this.passwordService.verify(
            userAuth.password.getValue(),
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
            ..._user,
            accessToken,
            refreshToken,
        }

        delete loginResponse.password

        userAuth.logged()
        userAuth.commit()

        return loginResponse
    }
}
