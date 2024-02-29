import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class UpdatedProductEvent extends DomainEvent<number> {
    EVENT_NAME = 'shopy.products.updated'
    constructor(public readonly id: number) {
        super(id)
    }
}
