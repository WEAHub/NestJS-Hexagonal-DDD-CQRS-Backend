import { EditUserDto } from '@core/user/shared/dto/EditUser.dto'

export class EditUserCommand {
    constructor(public readonly user: EditUserDto) {}
}
