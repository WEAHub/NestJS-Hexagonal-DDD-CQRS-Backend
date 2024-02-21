import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'

import { AdaptersModule } from '@infrastructure/adapters/adapters.module'
import { EventBusPublisherService } from '@core/shared/domain/services/eventbus/event-bus-publisher.service'
import { PersistenceModule } from '@infrastructure/persistance/persistence.module'

import { LoginUseCases } from './auth/application/services/LoginUseCases'
import { RefreshTokenUseCases } from './auth/application/services/RefreshUseCases'
import { UserUseCases } from './user/application/services/UserUseCases'

import { AuthService } from './auth/domain/services/AuthService'
import { TokenServiceProvider } from './auth/domain/services/TokenService'
import { UserServiceProvider } from './user/domain/services/UserService'
import { PasswordService } from './shared/domain/services/PasswordService'

import { LoginHandler } from './auth/application/entrypoint/commands/handlers/LoginHandler'
import { UserLoginEventHandler } from './auth/application/events/handlers/UserLoginHandler'
import { GetUserQueryHandler } from './user/application/entrypoint/queries/handlers/GetUserQueryHandler'
import { RefreshTokenHandler } from './auth/application/entrypoint/commands/handlers/RefreshToken'
import { AuthRepository } from './auth/domain/ports/outbound/repositories/AuthRepository'
import { AUTH_REPOSITORY } from './auth/shared/dependency-tokens/repositories'
import { EventBusPublisher } from './shared/domain/ports/inbound/EventBusPublisher'

export const EVENTBUS = 'EVENTBUS'

const eventHandlers = [
    UserLoginEventHandler, //
]

const commandHandlers = [
    LoginHandler, //
    RefreshTokenHandler,
]

const queryHandlers = [
    GetUserQueryHandler, //
]

const useCases = [
    LoginUseCases, //
    RefreshTokenUseCases,
    UserUseCases,
]

const services = [
    EventBusPublisherService,
    PasswordService,
    {
        provide: AuthService,
        inject: [
            AUTH_REPOSITORY, //
            EVENTBUS,
        ],
        useFactory: (
            authRepository: AuthRepository, //
            eventbus: EventBusPublisher,
        ) => new AuthService(authRepository, eventbus),
    },
    TokenServiceProvider,
    UserServiceProvider,
]

const providers = [
    ...services, //
    ...eventHandlers,
    ...commandHandlers,
    ...queryHandlers,
    ...useCases,
]

@Module({
    imports: [
        AdaptersModule,
        CqrsModule,
        PersistenceModule,
        JwtModule.register({ global: true }),
    ],
    providers: [
        {
            provide: EVENTBUS,
            useExisting: EventBusPublisherService,
        },
        ...providers,
    ],
    exports: [
        ...providers, //
        CqrsModule,
        AdaptersModule,
    ],
})
export class CoreModule {}
