import { User } from '@core/user/domain/interfaces/User'

export class RefreshTokenCommand {
    constructor(public readonly user: User) {}
}
