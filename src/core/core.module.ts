import { AdaptersModule } from '@infrastructure/adapters/adapters.module'
import { EventBusPublisherService } from '@infrastructure/adapters/eventbus/event-bus-publisher.service'
import { PersistenceModule } from '@infrastructure/persistance/persistence.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { LoginHandler } from './auth/application/entrypoint/commands/handlers/LoginHandler'
import { RefreshTokenHandler } from './auth/application/entrypoint/commands/handlers/RefreshToken'
import { LoginUseCases } from './auth/application/services/LoginUseCases'
import { RefreshTokenUseCases } from './auth/application/services/RefreshUseCases'
import { AuthServiceProvider } from './auth/domain/services/AuthService'
import { TokenServiceProvider } from './auth/domain/services/TokenService'
import { PasswordService } from './shared/domain/services/PasswordService'
import { GetUserQueryHandler } from './user/application/entrypoint/queries/handlers/GetUserQueryHandler'
import { UserUseCases } from './user/application/services/UserUseCases'
import { UserServiceProvider } from './user/domain/services/UserService'

export const EVENTBUS = 'EVENTBUS'

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
    AuthServiceProvider,
    TokenServiceProvider,
    UserServiceProvider,
    EventBusPublisherService,
    PasswordService,
]

const providers = [
    ...services,
    ...useCases,
    ...commandHandlers, //
    ...queryHandlers,
]

@Module({
    imports: [
        AdaptersModule,
        CqrsModule,
        PersistenceModule,
        JwtModule.register({ global: true }),
    ],
    providers: [
        ...providers,
        {
            provide: EVENTBUS,
            useExisting: EventBusPublisherService,
        },
    ],
    exports: [
        LoginUseCases, //
        CqrsModule,
        AdaptersModule,
        ...providers,
    ],
})
export class CoreModule {}
