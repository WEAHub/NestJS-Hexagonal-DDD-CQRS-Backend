import { Module } from '@nestjs/common';
import { InMemoryEventBus } from './eventbus/in-memory-event-bus.service';
import { PersistenceModule } from '../persistance/persistence.module';
import { PostgresAuthRepository } from './domain/postgres-auth.repository';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY'

const providers = [
    PostgresAuthRepository,
    InMemoryEventBus,
    {
        provide: AUTH_REPOSITORY,
        useExisting: PostgresAuthRepository
    }
]

@Module({
    imports: [
        PersistenceModule,
    ],
    providers: [
        ...providers
    ],
    exports: [
        ...providers
    ]
})
export class AdaptersModule {}
