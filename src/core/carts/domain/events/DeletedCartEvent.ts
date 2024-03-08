import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class DeletedCartEvent extends DomainEvent<number> {
    EVENT_NAME = 'shopy.cart.deleted'

    constructor(public readonly id: number) {
        super(id)
    }
}
