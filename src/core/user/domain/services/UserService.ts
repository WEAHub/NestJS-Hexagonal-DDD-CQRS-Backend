import { ValidationException } from '@core/shared/exception/ValidationException'
import { USER_REPOSITORY } from '@core/user/shared/dependency-tokens/repositories'
import { User } from '../interfaces/User'
import { UserRepository } from '../ports/outbound/repositories/UserRepository'
import { HttpException, HttpStatus } from '@nestjs/common'
import { UserServicePort } from '../ports/inbound/services/UserService'
import { SaveOptions } from 'typeorm'
import { ApplicationException } from '@core/shared/exception/ApplicationException'

export class UserService implements UserServicePort {
    constructor(private readonly user: UserRepository) {}

    async getUser(userId: number): Promise<User> {
        if (!userId && userId !== 0) {
            throw new ValidationException(`Invalid id(id=${userId})`)
        }

        const user: User = await this.user.findById(userId)

        if (!user) {
            throw new ApplicationException(`User(id="${userId}") Not found`)
        }

        return user
    }

    async create(user: User): Promise<User> {
        return await this.user.create(user)
    }

    async save(user: User, options?: SaveOptions): Promise<User> {
        return await this.user.save(user, options)
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

    async delete(userId: number): Promise<boolean> {
        return this.user.delete(userId)
    }
}

export const UserServiceProvider = {
    provide: UserService,
    inject: [USER_REPOSITORY],
    useFactory: (userRepository: UserRepository) =>
        new UserService(userRepository),
}
