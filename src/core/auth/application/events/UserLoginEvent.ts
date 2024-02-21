import { DomainEvent } from '@core/shared/ddd/DomainEvent'
import { User } from '@core/user/domain/interfaces/User'

export class UserLoginEvent extends DomainEvent<User> {
    static EVENT_NAME = 'shopy-backend.user-logged'

    constructor(user: User) {
        super(user)
    }

    getName(): string {
        return UserLoginEvent.EVENT_NAME
    }
}
