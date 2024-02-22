import { Module } from '@nestjs/common'
import { InMemoryEventBus } from '@core/shared/domain/services/eventbus/in-memory-event-bus.service'
import { CqrsModule } from '@nestjs/cqrs'
import { LoginController } from './primary/http/login.controller'
import { RefreshTokenController } from './primary/http/refresh-token.controller'
import { PostgresAuthRepository } from './secondary/db/postgres-auth.repository'
import { AUTH_REPOSITORY } from '@core/auth/shared/dependency-tokens/repositories'
import { PersistenceModule } from '@persistance/persistence.module'
import { UserEntity } from '@core/user/infrastructure/adapters/secondary/db/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

const controllers = [
    LoginController, //
    RefreshTokenController,
]

const providers = [
    PostgresAuthRepository,
    InMemoryEventBus,
    {
        provide: AUTH_REPOSITORY,
        useExisting: PostgresAuthRepository,
    },
]

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        CqrsModule,
        PersistenceModule,
    ],
    providers: providers,
    controllers,
    exports: providers,
})
export class AuthAdaptersModule {}
