import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteUserCommand } from '../../domain/commands/DeleteUser'
import { DeleteUserUseCases } from '../use-cases/DeleteUserUsecases'

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
    implements ICommandHandler<DeleteUserCommand>
{
    constructor(private useCases: DeleteUserUseCases) {}

    async execute(command: DeleteUserCommand) {
        return this.useCases.delete(command.id)
    }
}
