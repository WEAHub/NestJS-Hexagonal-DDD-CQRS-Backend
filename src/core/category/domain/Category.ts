import { AggregateRoot } from '@nestjs/cqrs'
import { CategoryName } from './vo/CategoryName'
import { CategoryDescription } from './vo/CategoryDescription'
import { Category as ICategory } from './interfaces/Category'
import { CreatedCategoryEvent } from './events/CreatedCategoryEvent'
import { DeletedCategoryEvent } from './events/DeletedCategoryEvent'
import { UpdatedCategoryEvent } from './events/UpdatedCategoryEvent'

export interface CategoryProperties {
    id?: number
    name: CategoryName
    description: CategoryDescription
}

export class Category extends AggregateRoot {
    readonly id: number
    name: CategoryName
    description: CategoryDescription

    constructor(properties: CategoryProperties) {
        super()
        Object.assign(this, properties)
    }

    created(): void {
        this.apply(new CreatedCategoryEvent(this.name.getValue()))
    }

    updated() {
        this.apply(new UpdatedCategoryEvent(this.id))
    }

    delete(): void {
        this.apply(new DeletedCategoryEvent(this.id))
    }

    toPrimitives(): ICategory {
        return {
            id: this?.id,
            name: this.name.getValue(),
            description: this.description.getValue(),
        }
    }
}
