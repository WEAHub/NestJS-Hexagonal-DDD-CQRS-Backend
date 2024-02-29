import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { Category, CategoryProperties } from './Category'
import { CategoryName } from './vo/CategoryName'
import { CategoryDescription } from './vo/CategoryDescription'
import { Category as ICategory } from './interfaces/Category'

export class CategoryFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

    create(options: ICategory): Category {
        const properties: CategoryProperties = {
            ...options,
            name: new CategoryName(options.name),
            description: new CategoryDescription(options.description),
        }

        const category = new Category(properties)
        return this.eventPublisher.mergeObjectContext(category)
    }
}
