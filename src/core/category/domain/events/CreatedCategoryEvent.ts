import { DomainEvent } from '@core/shared/ddd/DomainEvent'

export class CreatedCategoryEvent extends DomainEvent<string> {
    EVENT_NAME = 'shopy.categories.created'
    constructor(public readonly categoryName: string) {
        super(categoryName)
    }
}
