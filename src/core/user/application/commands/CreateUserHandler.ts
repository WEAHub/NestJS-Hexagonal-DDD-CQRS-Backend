import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from '../../domain/commands/CreateUser'
import { CreateUserUseCases } from '../use-cases/CreateUserUseCases'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
    implements ICommandHandler<CreateUserCommand>
{
    constructor(private useCases: CreateUserUseCases) {}

    async execute(command: CreateUserCommand) {
        return this.useCases.create(command.user)
    }
}
