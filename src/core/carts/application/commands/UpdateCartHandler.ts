import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateCartUseCases } from '../use-cases/UpdateCart'
import { UpdateCartCommand } from '@core/carts/domain/commands/UpdateCart'

@CommandHandler(UpdateCartCommand)
export class UpdateCartCommandHandler
    implements ICommandHandler<UpdateCartCommand>
{
    constructor(private useCases: UpdateCartUseCases) {}

    async execute(command: UpdateCartCommand) {
        return this.useCases.update(command.id, command.products)
    }
}
