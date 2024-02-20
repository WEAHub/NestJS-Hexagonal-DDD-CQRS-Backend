import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "../Login";
import { LoginUseCases } from "src/core/application/services/auth/LoginUseCases";
import { RefreshTokenCommand } from "../RefreshToken";
import { RefreshTokenUseCases } from "@core/application/services/auth/RefreshUseCases";


@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {

    constructor(private refresh: RefreshTokenUseCases) { }

    async execute(command: RefreshTokenCommand) {
        const { user, token } = command;
        return this.refresh.refreshToken(user, token)
    }

}