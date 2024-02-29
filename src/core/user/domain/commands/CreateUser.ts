import { CreateUserDto } from '@core/user/shared/dto/CreateUser.dto'

export class CreateUserCommand {
    constructor(public readonly user: CreateUserDto) {}
}
