import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateCategoryCommand } from '../CreateCategory'
import { CategoryUseCases } from '@core/category/application/services/CategoryUseCases'

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
    implements ICommandHandler<CreateCategoryCommand>
{
    constructor(private category: CategoryUseCases) {}

    async execute(command: CreateCategoryCommand) {
        return this.category.create(command.category)
    }
}
