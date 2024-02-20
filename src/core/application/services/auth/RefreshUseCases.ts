import { Token } from "@core/domain/interfaces/Token";
import { User } from "@core/domain/interfaces/User";
import { AuthService } from "@core/domain/services/AuthService";
import { PasswordService } from "@core/domain/services/PasswordService";
import { TokenService } from "@core/domain/services/TokenService";
import { LoginSuccessDto } from "@core/shared/dto/LoginSuccess.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenUseCases {

    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private passwordService: PasswordService
    ) { }

    async refreshToken(user: Token, token: string): Promise<LoginSuccessDto> {
        const _user: Partial<User> = {
            id: user.sub,
            ...user,
        }
        const accessToken: string = await this.tokenService.generateAccessToken(_user);
        const refreshToken: string = await this.tokenService.generateRefreshToken(_user);

        const refreshResponse: LoginSuccessDto = {
            accessToken,
            refreshToken
        }

        return refreshResponse
    }

}

export const RefreshTokenUseCasesProvider = {
  provide: RefreshTokenUseCases,
  useFactory: (
    authService: AuthService, 
    tokenService: TokenService,
    passwordService: PasswordService
  ) => 
  new RefreshTokenUseCases(
    authService, 
    tokenService, 
    passwordService
  ),
  inject: [ 
    AuthService, 
    TokenService, 
    PasswordService 
  ]
}