import { LoginDto } from '@core/auth/shared/dto/Login.dto'

export class LoginCommand {
    constructor(public readonly login: LoginDto) {}
}
