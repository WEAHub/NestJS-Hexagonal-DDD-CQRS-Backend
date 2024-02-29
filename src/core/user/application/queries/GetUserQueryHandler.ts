import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserQuery } from '../../domain/queries/GetUserQuery'
import { User } from '@core/user/domain/interfaces/User'
import { GetUserUseCases } from '../use-cases/GetUserUseCases'

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
    constructor(private useCases: GetUserUseCases) {}

    execute(user: GetUserQuery): Promise<User> {
        return this.useCases.getUser(user.userId)
    }
}
