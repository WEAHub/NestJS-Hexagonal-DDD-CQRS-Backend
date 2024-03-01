import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteProductCommand } from '../../domain/commands/DeleteProduct'
import { DeleteProductUseCases } from '../use-cases/DeleteProduct'

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler
    implements ICommandHandler<DeleteProductCommand>
{
    constructor(private useCases: DeleteProductUseCases) {}

    async execute(command: DeleteProductCommand) {
        return this.useCases.delete(command.id)
    }
}
