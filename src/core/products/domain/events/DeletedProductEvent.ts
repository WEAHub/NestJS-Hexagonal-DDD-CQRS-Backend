import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class DeletedProductEvent extends DomainEvent<number> {
    EVENT_NAME = 'shopy.products.deleted'

    constructor(public readonly id: number) {
        super(id)
    }
}
