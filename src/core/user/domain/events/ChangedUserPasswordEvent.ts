import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class ChangedUserPasswordEvent extends DomainEvent<number> {
    EVENT_NAME = 'shopy.user.changed-password'

    constructor(public readonly id: number) {
        super(id)
    }
}
