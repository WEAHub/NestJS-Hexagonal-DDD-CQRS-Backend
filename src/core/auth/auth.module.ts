import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PasswordService } from '@core/shared/domain/services/PasswordService'
import { LoginHandler } from './application/commands/LoginHandler'
import { RefreshTokenHandler } from './application/commands/RefreshToken'
import { UserLoginEventHandler } from './application/events/UserLoginHandler'
import { LoginUseCases } from './application/use-cases/LoginUseCases'
import { RefreshTokenUseCases } from './application/use-cases/RefreshUseCases'
import { TokenServiceProvider } from './domain/services/TokenService'
import { AuthInfrastructureModule } from './infrastructure/infrastructure.module'
import { AuthFactory } from './domain/AuthFactory'

const eventHandlers = [UserLoginEventHandler]
const commandHandlers = [LoginHandler, RefreshTokenHandler]
const queryHandlers = []
const useCases = [LoginUseCases, RefreshTokenUseCases]
const services = [PasswordService, TokenServiceProvider]
const domain = [AuthFactory]

const providers = [
    ...domain,
    ...services,
    ...eventHandlers,
    ...commandHandlers,
    ...queryHandlers,
    ...useCases,
]

@Module({
    imports: [CqrsModule, AuthInfrastructureModule],
    providers,
    exports: providers,
})
export class AuthModule {}
