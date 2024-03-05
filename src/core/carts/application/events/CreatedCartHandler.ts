import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CreatedCartEvent } from '@core/carts/domain/events/CreatedCartEvent'

@EventsHandler(CreatedCartEvent)
export class CreatedCartEventHandler
    implements IEventHandler<CreatedCartEvent>
{
    constructor() {}

    async handle(event: CreatedCartEvent) {
        Logger.log(
            `Cart(id=${event.cart.id}) for User(id=${event.cart.userId}) created`,
            event.getName(),
        )
    }
}
