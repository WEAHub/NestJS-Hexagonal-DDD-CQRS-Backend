import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { AdaptersModule } from '@infrastructure/adapters/adapters.module'
import { PersistenceModule } from '@infrastructure/persistance/persistence.module'
import { PasswordService } from '@core/shared/domain/services/PasswordService'
import { LoginHandler } from './application/entrypoint/commands/handlers/LoginHandler'
import { RefreshTokenHandler } from './application/entrypoint/commands/handlers/RefreshToken'
import { UserLoginEventHandler } from './application/events/handlers/UserLoginHandler'
import { LoginUseCases } from './application/services/LoginUseCases'
import { RefreshTokenUseCases } from './application/services/RefreshUseCases'
import { AuthServiceProvider } from './domain/services/AuthService'
import { TokenServiceProvider } from './domain/services/TokenService'
import { EventBusProviderModule } from '@core/shared/domain/services/eventbus/event-bus.provider.module'

const eventHandlers = [UserLoginEventHandler]
const commandHandlers = [LoginHandler, RefreshTokenHandler]
const queryHandlers = []
const useCases = [LoginUseCases, RefreshTokenUseCases]
const services = [PasswordService, AuthServiceProvider, TokenServiceProvider]

const providers = [
    ...services,
    ...eventHandlers,
    ...commandHandlers,
    ...queryHandlers,
    ...useCases,
]

@Module({
    imports: [
        EventBusProviderModule,
        AdaptersModule,
        CqrsModule,
        PersistenceModule,
    ],
    providers,
    exports: providers,
})
export class AuthModule {}
