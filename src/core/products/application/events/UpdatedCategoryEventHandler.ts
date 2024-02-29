import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { UpdatedProductEvent } from '@core/products/domain/events/UpdatedProductEvent'

@EventsHandler(UpdatedProductEvent)
export class UpdatedProductEventHandler
    implements IEventHandler<UpdatedProductEvent>
{
    async handle(event: UpdatedProductEvent): Promise<void> {
        Logger.log(`Product(name="${event.id}") updated`)
    }
}
