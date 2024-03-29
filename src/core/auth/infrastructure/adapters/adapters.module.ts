import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { LoginController } from './primary/http/login.controller'
import { RefreshTokenController } from './primary/http/refresh-token.controller'
import { PostgresAuthRepository } from './secondary/db/postgres-auth.repository'
import { AUTH_REPOSITORY } from '@core/auth/shared/dependency-tokens/repositories'
import { UserEntity } from '@core/user/infrastructure/adapters/secondary/db/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

const controllers = [
    LoginController, //
    RefreshTokenController,
]

const providers = [
    PostgresAuthRepository,
    {
        provide: AUTH_REPOSITORY,
        useExisting: PostgresAuthRepository,
    },
]

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
    providers: providers,
    controllers,
    exports: providers,
})
export class AuthAdaptersModule {}
