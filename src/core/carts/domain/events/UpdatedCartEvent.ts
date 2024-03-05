import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class UpdatedUserEvent extends DomainEvent<number> {
    EVENT_NAME = 'shopy.cart.updated'
    constructor(public readonly id: number) {
        super(id)
    }
}
