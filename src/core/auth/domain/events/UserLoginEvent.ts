import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class UserLoginEvent extends DomainEvent<string> {
    static EVENT_NAME = 'shopy-backend.user-logged'

    constructor(email: string) {
        super(email)
    }

    getName(): string {
        return UserLoginEvent.EVENT_NAME
    }
}
