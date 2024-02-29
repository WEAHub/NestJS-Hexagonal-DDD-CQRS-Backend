import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class CreatedProductEvent extends DomainEvent<string> {
    EVENT_NAME = 'shopy.products.created'

    constructor(public readonly productName: string) {
        super(productName)
    }
}
