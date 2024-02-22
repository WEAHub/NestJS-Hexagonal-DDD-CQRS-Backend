import { User } from '@core/user/domain/interfaces/User'

export class EditUserCommand {
    constructor(public readonly user: User) {}
}
