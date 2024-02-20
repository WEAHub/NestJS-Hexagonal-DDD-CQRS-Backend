import { User } from '@core/domain/interfaces/User';

export class GetUserQuery {
    constructor(public readonly user: Partial<User>) {}
}
