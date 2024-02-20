import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "../Login";
import { LoginUseCases } from "src/core/application/services/auth/LoginUseCases";


@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {

    constructor(private login: LoginUseCases) { }

    async execute(command: LoginCommand) {
        return this.login.login(command.login)
    }

}