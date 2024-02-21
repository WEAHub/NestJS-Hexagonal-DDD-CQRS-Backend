import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@db-entities/user.entity'
import { Repository } from 'typeorm'
import { UserRepository } from '@core/user/domain/ports/outbound/repositories/UserRepository'
import { User } from '@core/user/domain/interfaces/User'

@Injectable()
export class PostgresUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
    ) {}

    async findById(userId: number): Promise<User> {
        return this.repository.findOneBy({
            id: userId,
        })
    }
}
