import { EditUserDto } from '@core/user/shared/dto/EditUser.dto'

export class UpdateUserCommand {
    constructor(public readonly user: EditUserDto) {}
}
