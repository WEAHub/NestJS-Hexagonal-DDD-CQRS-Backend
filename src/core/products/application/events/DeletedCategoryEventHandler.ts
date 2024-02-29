import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DeletedProductEvent } from '@core/products/domain/events/DeletedProductEvent'

@EventsHandler(DeletedProductEvent)
export class DeletedProductEventHandler
    implements IEventHandler<DeletedProductEvent>
{
    async handle(event: DeletedProductEvent): Promise<void> {
        Logger.log(`Product(name="${event.id}") deleted`, event.getName())
    }
}
