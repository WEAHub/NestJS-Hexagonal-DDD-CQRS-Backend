import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class UserLoginEvent extends DomainEvent<string> {
    EVENT_NAME = 'shopy.auth.user-logged'

    constructor(email: string) {
        super(email)
    }
}
