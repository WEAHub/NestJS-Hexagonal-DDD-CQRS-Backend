import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@db-entities/user.entity'
import { Repository } from 'typeorm'
import { AuthRepository } from '@core/auth/domain/ports/outbound/repositories/AuthRepository'
import { User } from '@core/user/domain/interfaces/User'

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
