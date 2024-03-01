import { User } from '@core/user/domain/interfaces/User'
import { UserRepository } from '@core/user/domain/ports/outbound/repositories/UserRepository'
import { USER_REPOSITORY } from '@core/user/shared/dependency-tokens/repositories'
import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class GetUserUseCases {
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository

    async getUser(id: number): Promise<User> {
        const user: User = await this.repository.findById(id)
        delete user.password
        return user
    }
}
