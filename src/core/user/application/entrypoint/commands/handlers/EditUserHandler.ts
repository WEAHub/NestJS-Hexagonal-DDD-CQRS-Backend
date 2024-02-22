import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserUseCases } from '@core/user/application/services/UserUseCases'
import { EditUserCommand } from '../EditUser'

@CommandHandler(EditUserCommand)
export class EditUserCommandHandler
    implements ICommandHandler<EditUserCommand>
{
    constructor(private user: UserUseCases) {}

    async execute(command: EditUserCommand) {
        return this.user.update(command.user)
    }
}
