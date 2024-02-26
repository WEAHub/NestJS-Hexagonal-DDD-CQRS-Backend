import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserUseCases } from '@core/user/application/services/UserUseCases'
import { UpdateUserCommand } from '../UpdateUser'

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
    implements ICommandHandler<UpdateUserCommand>
{
    constructor(private user: UserUseCases) {}

    async execute(command: UpdateUserCommand) {
        return this.user.update(command.user)
    }
}
