import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DeletedCategoryEvent } from '@core/category/domain/events/DeletedCategoryEvent'

@EventsHandler(DeletedCategoryEvent)
export class DeletedCategoryEventHandler
    implements IEventHandler<DeletedCategoryEvent>
{
    async handle(event: DeletedCategoryEvent): Promise<void> {
        Logger.log(`Category(name="${event.id}") deleted`, event.getName())
    }
}
