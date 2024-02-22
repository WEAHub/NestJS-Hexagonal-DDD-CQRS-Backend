import { EntityNotFoundException } from '@core/shared/exception/EntityNotFoundException'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { USER_REPOSITORY } from '@core/user/shared/dependency-tokens/repositories'
import { User } from '../interfaces/User'
import { UserRepository } from '../ports/outbound/repositories/UserRepository'
import { HttpException, HttpStatus } from '@nestjs/common'
import { UserServicePort } from '../ports/inbound/services/UserService'

export class UserService implements UserServicePort {
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

    async create(user: User): Promise<User> {
        return await this.user.create(user)
    }

    async save(user: User): Promise<User> {
        return await this.user.save(user)
    }

    async checkUser(email: string): Promise<User> {
        const _user: User = await this.user.findByEmail(email)

        if (_user) {
            throw new HttpException(
                'Email already exists',
                HttpStatus.UNAUTHORIZED,
            )
        }

        return _user
    }

    async edit(user: User): Promise<User> {
        return this.user.save(user)
    }
}

export const UserServiceProvider = {
    provide: UserService,
    inject: [USER_REPOSITORY],
    useFactory: (userRepository: UserRepository) =>
        new UserService(userRepository),
}
