import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateCategoryCommand } from '../../domain/commands/CreateCategory'
import { CreateCategoryUseCase } from '../use-cases/CreateCategoryUseCases'

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
    implements ICommandHandler<CreateCategoryCommand>
{
    constructor(private category: CreateCategoryUseCase) {}

    async execute(command: CreateCategoryCommand) {
        return this.category.create(command.category)
    }
}
