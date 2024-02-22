import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthRepository } from '@core/auth/domain/ports/outbound/repositories/AuthRepository'
import { User } from '@core/user/domain/interfaces/User'
import { UserEntity } from '@core/user/infrastructure/adapters/secondary/db/entities/user.entity'

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
