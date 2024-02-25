import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CategoryUseCases } from '@core/category/application/services/CategoryUseCases'
import { DeleteCategoryCommand } from '../DeleteCategory'

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryCommandHandler
    implements ICommandHandler<DeleteCategoryCommand>
{
    constructor(private category: CategoryUseCases) {}

    async execute(command: DeleteCategoryCommand) {
        return this.category.delete(command.id)
    }
}
