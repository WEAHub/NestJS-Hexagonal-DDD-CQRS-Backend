import { LoginDto } from '@core/auth/shared/dto/Login.dto'
import { User } from '@core/user/domain/interfaces/User'
import { EVENTBUS } from '@core/core.module'
import { EntityNotFoundException } from '@core/shared/exception/EntityNotFoundException'
import { AUTH_REPOSITORY } from '@core/auth/shared/dependency-tokens/repositories'
import { EventBusPublisher } from '@core/shared/domain/ports/inbound/EventBusPublisher'
import { UserLoginEvent } from '@core/auth/application/events/UserLoginEvent'
import { AuthRepository } from '../ports/outbound/repositories/AuthRepository'

export class AuthService {
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

