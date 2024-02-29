import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RefreshTokenCommand } from '../../domain/commands/RefreshToken'
import { RefreshTokenUseCases } from '@core/auth/application/use-cases/RefreshUseCases'

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
    implements ICommandHandler<RefreshTokenCommand>
{
    constructor(private refresh: RefreshTokenUseCases) {}

    async execute(command: RefreshTokenCommand) {
        const { user } = command
        return this.refresh.refreshToken(user)
    }
}