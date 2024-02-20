import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AuthServiceProvider } from './domain/services/AuthService'
import { LoginUseCases } from './application/services/auth/LoginUseCases'
import { LoginHandler } from './application/features/commands/auth/handlers/LoginHandler'
import { PersistenceModule } from '@infrastructure/persistance/persistence.module'
import { AdaptersModule } from '@infrastructure/adapters/adapters.module'
import { EventBusPublisherService } from '@infrastructure/adapters/eventbus/event-bus-publisher.service'
import { JwtModule } from '@nestjs/jwt'
import { TokenServiceProvider } from './domain/services/TokenService'
import { PasswordService } from './domain/services/PasswordService'
import { RefreshTokenHandler } from './application/features/commands/auth/handlers/RefreshToken'
import { RefreshTokenUseCases } from './application/services/auth/RefreshUseCases'
import { UserUseCases } from './application/services/user/UserUseCases'
import { UserServiceProvider } from './domain/services/UserService'
import { GetUserQueryHandler } from './application/features/queries/user/handlers/GetUserQueryHandler'

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
