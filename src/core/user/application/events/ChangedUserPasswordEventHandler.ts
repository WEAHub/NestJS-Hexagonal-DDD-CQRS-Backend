import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ChangedUserPasswordEvent } from '@core/user/domain/events/ChangedUserPasswordEvent'

@EventsHandler(ChangedUserPasswordEvent)
export class ChangedUserPasswordEventHandler
    implements IEventHandler<ChangedUserPasswordEvent>
{
    async handle(event: ChangedUserPasswordEvent): Promise<void> {
        Logger.log(`User(id=${event.id}) changed password`, event.getName())
    }
}
