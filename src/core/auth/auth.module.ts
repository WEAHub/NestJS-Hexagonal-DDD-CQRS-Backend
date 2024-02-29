import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PasswordService } from '@core/shared/domain/services/PasswordService'
import { LoginHandler } from './application/commands/LoginHandler'
import { RefreshTokenHandler } from './application/commands/RefreshTokenHandler'
import { UserLoginEventHandler } from './application/events/UserLoginHandler'
import { LoginUseCases } from './application/use-cases/LoginUseCases'
import { RefreshTokenUseCases } from './application/use-cases/RefreshUseCases'
import { AuthInfrastructureModule } from './infrastructure/infrastructure.module'
import { AuthFactory } from './domain/AuthFactory'
import { TokenServiceProvider } from './domain/services/TokenService'

import UseCases from './application/use-cases'
import Events from './application/events'
import Commands from './application/commands'

const Services = [PasswordService, TokenServiceProvider]

const providers = [
    AuthFactory,
    ...Commands,
    ...Events,
    ...UseCases,
    ...Services,
]
@Module({
    imports: [CqrsModule, AuthInfrastructureModule],
    providers,
    exports: providers,
})
export class AuthModule {}
