import { LoginDto } from 'src/core/shared/dto/Login.dto'

export class LoginCommand {
    constructor(public readonly login: LoginDto) {}
}
