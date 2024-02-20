import { Module } from '@nestjs/common'
import { InMemoryEventBus } from './eventbus/in-memory-event-bus.service'
import { PersistenceModule } from '../persistance/persistence.module'
import { PostgresAuthRepository } from './domain/postgres-auth.repository'
import { PostgresUserRepository } from './domain/postgres-user.repository'

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY'
export const USER_REPOSITORY = 'USER_REPOSITORY'

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
