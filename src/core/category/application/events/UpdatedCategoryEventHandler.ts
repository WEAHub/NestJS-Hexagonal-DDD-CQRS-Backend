import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { UpdatedCategoryEvent } from '@core/category/domain/events/UpdatedCategoryEvent'

@EventsHandler(UpdatedCategoryEvent)
export class UpdatedCategoryEventHandler
    implements IEventHandler<UpdatedCategoryEvent>
{
    async handle(event: UpdatedCategoryEvent): Promise<void> {
        Logger.log(`Category(name="${event.id}") updated}`)
    }
}
