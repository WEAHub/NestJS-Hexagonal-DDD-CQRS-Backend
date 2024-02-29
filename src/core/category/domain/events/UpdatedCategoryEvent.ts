import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class UpdatedCategoryEvent extends DomainEvent<number> {
    EVENT_NAME = 'shopy.categories.updated'
    constructor(public readonly id: number) {
        super(id)
    }
}
