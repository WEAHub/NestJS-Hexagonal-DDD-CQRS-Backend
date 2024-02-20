import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@core/domain/interfaces/User'
import { AuthRepository } from '@domain/ports/outbound/AuthRepository'
import { UserEntity } from '@db-entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PostgresAuthRepository implements AuthRepository {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
    ) {}

    async findByEmail(email: string): Promise<User> {
        return this.repository.findOneBy({ email })
    }
}
