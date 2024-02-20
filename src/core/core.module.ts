import { Module } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { AuthServiceProvider } from "./domain/services/AuthService"
import { LoginUseCases, LoginUseCasesProvider } from "./application/services/auth/LoginUseCases"
import { LoginHandler } from "./application/features/commands/auth/handlers/LoginHandler"
import { PersistenceModule } from "@infrastructure/persistance/persistence.module"
import { AdaptersModule } from "@infrastructure/adapters/adapters.module"
import { EventBusPublisherService } from "@infrastructure/adapters/eventbus/event-bus-publisher.service"
import { JwtModule } from "@nestjs/jwt"
import { TokenServiceProvider } from "./domain/services/TokenService"
import { PasswordService } from "./domain/services/PasswordService"
import { RefreshTokenHandler } from "./application/features/commands/auth/handlers/RefreshToken"
import { RefreshTokenUseCasesProvider } from "./application/services/auth/RefreshUseCases"

export const EVENTBUS = 'EVENTBUS'

const commandHandlers = [
  LoginHandler,
  RefreshTokenHandler,
]

const useCases = [
  LoginUseCasesProvider,
  RefreshTokenUseCasesProvider
]

const services = [
  AuthServiceProvider,
  TokenServiceProvider,
  EventBusPublisherService,
  PasswordService
]

const providers = [
  ...commandHandlers,
  ...useCases,
  ...services,
]

@Module({
  imports: [
    AdaptersModule,
    CqrsModule,
    PersistenceModule,
    JwtModule.register({ global: true })
  ], 
  providers: [
    ...providers,
    {
      provide: EVENTBUS,
      useExisting: EventBusPublisherService
    }
  ],
  exports: [
    LoginUseCases,
    CqrsModule,
    AdaptersModule,
    ...providers,
  ]
})
export class CoreModule { }