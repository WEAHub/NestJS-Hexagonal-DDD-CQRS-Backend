import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@core/domain/interfaces/User'
import { UserEntity } from '@db-entities/user.entity'
import { Repository } from 'typeorm'
import { UserRepository } from '@core/domain/ports/outbound/UserRepository'

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
