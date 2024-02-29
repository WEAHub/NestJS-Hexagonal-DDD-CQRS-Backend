import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class UserLoginEvent extends DomainEvent<string> {
    EVENT_NAME = 'shopy-backend.user-logged'

    constructor(email: string) {
        super(email)
    }
}
