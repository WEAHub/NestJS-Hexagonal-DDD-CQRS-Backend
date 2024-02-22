import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserQuery } from '../GetUserQuery'
import { UserUseCases } from '@core/user/application/services/UserUseCases'
import { User } from '@core/user/domain/interfaces/User'

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
    constructor(private user: UserUseCases) {}

    execute(user: GetUserQuery): Promise<User> {
        return this.user.getUser(user.userId)
    }
}
