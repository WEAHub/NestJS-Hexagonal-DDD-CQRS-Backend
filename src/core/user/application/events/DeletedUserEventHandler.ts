import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DeletedUserEvent } from '@core/user/domain/events/DeletedUserEvent'

@EventsHandler(DeletedUserEvent)
export class DeletedUserEventHandler
    implements IEventHandler<DeletedUserEvent>
{
    async handle(event: DeletedUserEvent): Promise<void> {
        Logger.log(`User(id=${event.id}) deleted`, event.getName())
    }
}
