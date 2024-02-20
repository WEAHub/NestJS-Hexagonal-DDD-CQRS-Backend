import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserQuery } from '../GetUserQuery'
import { User } from '@core/domain/interfaces/User'
import { UserUseCases } from '@core/application/services/user/UserUseCases'

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
    constructor(private user: UserUseCases) {}

    execute(user: GetUserQuery): Promise<User> {
        const { id: userId } = user.user
        return this.user.getUser(userId)
    }
}
