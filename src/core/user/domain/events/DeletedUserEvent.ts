import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class DeletedUserEvent extends DomainEvent<number> {
    EVENT_NAME = 'shopy.user.deleted'

    constructor(public readonly id: number) {
        super(id)
    }
}
