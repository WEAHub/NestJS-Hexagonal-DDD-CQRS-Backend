import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from '../CreateUser'
import { UserUseCases } from '@core/user/application/services/UserUseCases'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
    implements ICommandHandler<CreateUserCommand>
{
    constructor(private user: UserUseCases) {}

    async execute(command: CreateUserCommand) {
        return this.user.create(command.user)
    }
}
