import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class CreatedUserEvent extends DomainEvent<number> {
    EVENT_NAME = 'shopy.user.created'

    constructor(public readonly id: number) {
        super(id)
    }
}
