import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class DeletedCategoryEvent extends DomainEvent<number> {
    EVENT_NAME = 'shopy.categories.deleted'
    constructor(public readonly id: number) {
        super(id)
    }
}
