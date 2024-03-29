import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserRepository } from '@core/user/domain/ports/outbound/repositories/UserRepository'
import { User } from '@core/user/domain/interfaces/User'
import { SaveOptions } from 'typeorm'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class PostgresUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
    ) {}

    async findById(id: number): Promise<User> {
        return this.repository.findOneBy({ id })
    }

    async create(user: User): Promise<User> {
        return this.repository.create(user)
    }

    async save(user: User, options?: SaveOptions): Promise<User> {
        return this.repository.save(user, options)
    }

    async findByEmail(email: string): Promise<User> {
        return this.repository.findOneBy({ email })
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.repository.delete({ id })
        return deleted.affected > 0
    }
}
