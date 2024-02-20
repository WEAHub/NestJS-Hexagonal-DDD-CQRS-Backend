import { User } from "@core/domain/interfaces/User";
import { PasswordService } from "@core/domain/services/PasswordService";
import { TokenService } from "@core/domain/services/TokenService";
import { LoginSuccessDto } from "@core/shared/dto/LoginSuccess.dto";
import { ValidationException } from "@core/shared/exception/ValidationException";
import { Injectable } from "@nestjs/common";
import { AuthService } from "src/core/domain/services/AuthService";
import { LoginDto } from "src/core/shared/dto/Login.dto";

@Injectable()
export class LoginUseCases {

    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private passwordService: PasswordService
    ) { }

    async login(user: LoginDto): Promise<LoginSuccessDto> {

        const _user: User =  await this.authService.checkUser(user);
        const passwordMatch: boolean = await this.passwordService.verify(user.password, _user.password);

        if(!passwordMatch) {
            throw new ValidationException(`Password invalid for User(email=${user.email})`)
        }
        
        const accessToken: string = await this.tokenService.generateAccessToken(_user);
        const refreshToken: string = await this.tokenService.generateRefreshToken(_user);

        const loginResponse: LoginSuccessDto = {
            accessToken,
            refreshToken
        }

        return loginResponse; 
    }

    
}

export const LoginUseCasesProvider = {
    provide: LoginUseCases,
    useFactory: (
        authService: AuthService, 
        tokenService: TokenService,
        passwordService: PasswordService
    ) => 
    new LoginUseCases(
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