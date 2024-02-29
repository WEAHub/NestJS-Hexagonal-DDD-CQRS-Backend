import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateCategoryCommand } from '../../domain/commands/UpdateCategory'
import { UpdateCategoryUseCase } from '../use-cases/UpdateCategoryUseCases'

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler
    implements ICommandHandler<UpdateCategoryCommand>
{
    constructor(private category: UpdateCategoryUseCase) {}

    async execute(command: UpdateCategoryCommand) {
        return this.category.update(command.id, command.category)
    }
}
