import { LoginDto } from '@core/auth/shared/dto/Login.dto'
import { User } from '@core/user/domain/interfaces/User'
import { AuthRepository } from '../ports/outbound/repositories/AuthRepository'
import { EntityNotFoundException } from '@core/shared/exception/EntityNotFoundException'
import { AUTH_REPOSITORY } from '@core/auth/shared/dependency-tokens/repositories'

export class AuthService {
    constructor(private readonly auth: AuthRepository) {}

    async checkUser(user: LoginDto): Promise<User> {
        const _user: User = await this.auth.findByEmail(user.email)

        if (!_user) {
            throw new EntityNotFoundException(
                `User(email="${user.email}") Not found`,
            )
        }

        return _user
    }
}

export const AuthServiceProvider = {
    provide: AuthService,
    useFactory: (authRepository: AuthRepository) =>
        new AuthService(authRepository),
    inject: [AUTH_REPOSITORY],
}
