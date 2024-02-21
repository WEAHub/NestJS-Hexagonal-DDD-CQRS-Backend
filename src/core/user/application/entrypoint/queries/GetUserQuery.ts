import { User } from '@core/user/domain/interfaces/User'

export class GetUserQuery {
    constructor(public readonly user: Partial<User>) {}
}
