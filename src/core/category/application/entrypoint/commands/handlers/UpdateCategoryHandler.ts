import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateCategoryCommand } from '../UpdateCategory'
import { CategoryUseCases } from '@core/category/application/services/CategoryUseCases'

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler
    implements ICommandHandler<UpdateCategoryCommand>
{
    constructor(private category: CategoryUseCases) {}

    async execute(command: UpdateCategoryCommand) {
        return this.category.update(command.id, command.category)
    }
}
