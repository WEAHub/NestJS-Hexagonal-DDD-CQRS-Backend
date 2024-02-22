import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteUserCommand } from '../DeleteUser'
import { UserUseCases } from '@core/user/application/services/UserUseCases'

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
    implements ICommandHandler<DeleteUserCommand>
{
    constructor(private user: UserUseCases) {}

    async execute(command: DeleteUserCommand) {
        return this.user.delete(command.id)
    }
}
