import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateCartUseCases } from '../use-cases/CreateCart'
import { CreateCartCommand } from '@core/carts/domain/commands/CreateCart'

@CommandHandler(CreateCartCommand)
export class CreateCartCommandHandler
    implements ICommandHandler<CreateCartCommand>
{
    constructor(private useCases: CreateCartUseCases) {}

    async execute(command: CreateCartCommand) {
        return this.useCases.create(command.userId)
    }
}
