import { Module } from '@nestjs/common'
import { InMemoryEventBus } from './eventbus/in-memory-event-bus.service'
import { PersistenceModule } from '../persistance/persistence.module'
import { PostgresAuthRepository } from './domain/postgres-auth.repository'
import { PostgresUserRepository } from './domain/postgres-user.repository'
import { AUTH_REPOSITORY } from '@core/auth/shared/dependency-tokens/repositories'
import { USER_REPOSITORY } from '@core/user/shared/dependency-tokens/repositories'

const providers = [
    PostgresAuthRepository,
    PostgresUserRepository,
    InMemoryEventBus,
    {
        provide: AUTH_REPOSITORY,
        useExisting: PostgresAuthRepository,
    },
    {
        provide: USER_REPOSITORY,
        useExisting: PostgresUserRepository,
    },
]

@Module({
    imports: [PersistenceModule],
    providers: [...providers],
    exports: [...providers],
})
export class AdaptersModule {}
