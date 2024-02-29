import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserCommand } from '../../domain/commands/UpdateUser'
import { UpdateUserUseCases } from '../use-cases/UpdateUserUseCases'

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
    implements ICommandHandler<UpdateUserCommand>
{
    constructor(private useCases: UpdateUserUseCases) {}

    async execute(command: UpdateUserCommand) {
        return this.useCases.update(command.user)
    }
}
