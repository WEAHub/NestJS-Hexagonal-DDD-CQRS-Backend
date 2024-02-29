import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteCategoryCommand } from '../../domain/commands/DeleteCategory'
import { DeleteCategoryUseCase } from '../use-cases/DeleteCategoryUseCases'

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryCommandHandler
    implements ICommandHandler<DeleteCategoryCommand>
{
    constructor(private category: DeleteCategoryUseCase) {}

    async execute(command: DeleteCategoryCommand) {
        return this.category.delete(command.id)
    }
}
