import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CreatedProductEvent } from '@core/products/domain/events/CreatedProductEvent'

@EventsHandler(CreatedProductEvent)
export class CreatedProductEventHandler
    implements IEventHandler<CreatedProductEvent>
{
    async handle(event: CreatedProductEvent): Promise<void> {
        Logger.log(`Product(name="${event.productName}") created`)
    }
}
