import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { UpdatedUserEvent } from '@core/user/domain/events/UpdatedUserEvent'

@EventsHandler(UpdatedUserEvent)
export class UpdatedUserEventHandler
    implements IEventHandler<UpdatedUserEvent>
{
    async handle(event: UpdatedUserEvent): Promise<void> {
        Logger.log(`User(id="${event.id}") updated`)
    }
}
