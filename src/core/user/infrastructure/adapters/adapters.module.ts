import { Module } from '@nestjs/common'
import { USER_REPOSITORY } from '@core/user/shared/dependency-tokens/repositories'
import { PostgresUserRepository } from './secondary/db/postgres-user.repository'
import { GetUserController } from './primary/http/get.controller'
import { CreateUserController } from './primary/http/create.controller'
import { InMemoryEventBus } from '@core/shared/domain/services/eventbus/in-memory-event-bus.service'
import { CqrsModule } from '@nestjs/cqrs'
import { UserEntity } from './secondary/db/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UpdateUserController } from './primary/http/update.controller'
import { DeleteUserController } from './primary/http/delete.controller'

const controllers = [
    CreateUserController, //
    GetUserController,
    UpdateUserController,
    DeleteUserController,
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
    imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
    providers: providers,
    controllers,
    exports: providers,
})
export class UserAdaptersModule {}
