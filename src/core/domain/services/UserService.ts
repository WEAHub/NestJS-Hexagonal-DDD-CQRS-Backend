import { EntityNotFoundException } from '@core/shared/exception/EntityNotFoundException'
import { User } from '../interfaces/User'
import { UserRepository } from '../ports/outbound/UserRepository'
import { USER_REPOSITORY } from '@infrastructure/adapters/adapters.module'
import { ValidationException } from '@core/shared/exception/ValidationException'

export class UserService {
    constructor(private readonly user: UserRepository) {}

    async getUser(userId: number): Promise<User> {
        if (!userId && userId !== 0) {
            throw new ValidationException(`Invalid id(id=${userId})`)
        }

        const user: User = await this.user.findById(userId)

        if (!user) {
            throw new EntityNotFoundException(`User(id="${userId}") Not found`)
        }

        return user
    }
}

export const UserServiceProvider = {
    provide: UserService,
    useFactory: (userRepository: UserRepository) =>
        new UserService(userRepository),
    inject: [USER_REPOSITORY],
}