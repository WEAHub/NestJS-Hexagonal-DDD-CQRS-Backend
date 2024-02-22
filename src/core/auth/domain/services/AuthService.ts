import { LoginDto } from '@core/auth/shared/dto/Login.dto'
import { User } from '@core/user/domain/interfaces/User'
import { EntityNotFoundException } from '@core/shared/exception/EntityNotFoundException'
import { EventBusPublisher } from '@core/shared/domain/ports/inbound/EventBusPublisher'
import { UserLoginEvent } from '@core/auth/application/events/UserLoginEvent'
import { AuthRepository } from '../ports/outbound/repositories/AuthRepository'
import { AUTH_REPOSITORY } from '@core/auth/shared/dependency-tokens/repositories'
import { EVENTBUS } from '@core/shared/domain/services/eventbus/event-bus.provider.module'
import { AuthServicePort } from '../ports/inbound/services/AuthService.service.port'

export class AuthService implements AuthServicePort {
    constructor(
        private readonly auth: AuthRepository,
        private readonly eventbus: EventBusPublisher,
    ) {}

    async checkUser(user: LoginDto): Promise<User> {
        const _user: User = await this.auth.findByEmail(user.email)

        if (!_user) {
            throw new EntityNotFoundException(
                `User(email="${user.email}") Not found`,
            )
        }

        this.eventbus.publish(new UserLoginEvent(_user))

        return _user
    }
}

export const AuthServiceProvider = {
    provide: AuthService,
    inject: [AUTH_REPOSITORY, EVENTBUS],
    useFactory: (authRepository: AuthRepository, eventbus: EventBusPublisher) =>
        new AuthService(authRepository, eventbus),
}
