import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CreatedUserEvent } from '@core/user/domain/events/CreatedUserEvent'

@EventsHandler(CreatedUserEvent)
export class CreatedUserEventHandler
    implements IEventHandler<CreatedUserEvent>
{
    async handle(event: CreatedUserEvent): Promise<void> {
        Logger.log(`User(id=${event.id}) created`, event.getName())
    }
}
