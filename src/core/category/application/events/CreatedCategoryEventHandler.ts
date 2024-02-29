import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CreatedCategoryEvent } from '@core/category/domain/events/CreatedCategoryEvent'

@EventsHandler(CreatedCategoryEvent)
export class CreatedCategoryEventHandler
    implements IEventHandler<CreatedCategoryEvent>
{
    async handle(event: CreatedCategoryEvent): Promise<void> {
        Logger.log(`Category(name="${event.categoryName}") created`)
    }
}
