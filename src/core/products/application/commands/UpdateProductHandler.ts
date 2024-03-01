import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateProductCommand } from '../../domain/commands/UpdateProduct'
import { UpdateProductUseCases } from '../use-cases/UpdateProduct'

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
    implements ICommandHandler<UpdateProductCommand>
{
    constructor(private useCases: UpdateProductUseCases) {}

    async execute(command: UpdateProductCommand) {
        return this.useCases.update(command.id, command.product)
    }
}
