import { Module } from '@nestjs/common'
import { USER_REPOSITORY } from '@core/user/shared/dependency-tokens/repositories'
import { PostgresUserRepository } from './secondary/db/postgres-user.repository'
import { GetUserController } from './primary/http/get.controller'
import { CreateUserController } from './primary/http/create.controller'
import { InMemoryEventBus } from '@core/shared/domain/services/eventbus/in-memory-event-bus.service'
import { CqrsModule } from '@nestjs/cqrs'
import { PersistenceModule } from '@persistance/persistence.module'
import { UserEntity } from './secondary/db/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

const controllers = [
    CreateUserController, //
    GetUserController,
]

const providers = [
    PostgresUserRepository,
    InMemoryEventBus,
    {
        provide: USER_REPOSITORY,
        useExisting: PostgresUserRepository,
    },
]

@Module({
    imports: [
        CqrsModule,
        PersistenceModule,
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: providers,
    controllers,
    exports: providers,
})
export class UserAdaptersModule {}
