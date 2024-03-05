import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject, Logger } from '@nestjs/common'
import { CreatedUserEvent } from '@core/user/domain/events/CreatedUserEvent'
import { CreateCartCommand } from '@core/carts/domain/commands/CreateCart'

@EventsHandler(CreatedUserEvent)
export class CreatedUserEventHandler
    implements IEventHandler<CreatedUserEvent>
{
    @Inject()
    private readonly command: CommandBus

    async handle(event: CreatedUserEvent): Promise<void> {
        Logger.log(`User(id=${event.id}) created`, event.getName())
        this.command.execute(new CreateCartCommand(event.id))
    }
}
