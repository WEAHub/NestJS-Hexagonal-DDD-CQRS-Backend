import { EventBusProviderModule } from '@core/shared/domain/services/eventbus/event-bus.service.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GetUserQueryHandler } from './application/entrypoint/queries/handlers/GetUserQueryHandler'
import { UserUseCases } from './application/services/UserUseCases'
import { UserServiceProvider } from './domain/services/UserService'
import { CreateUserCommandHandler } from './application/entrypoint/commands/handlers/CreateUserHandler'
import { PasswordService } from '@core/shared/domain/services/PasswordService'
import { UserInfrastructureModule } from './infrastructure/infrastructure.module'
import { EditUserCommandHandler } from './application/entrypoint/commands/handlers/EditUserHandler'
import { DeleteUserCommandHandler } from './application/entrypoint/commands/handlers/DeleteUserHandler'

const eventHandlers = []
const commandHandlers = [
    CreateUserCommandHandler,
    EditUserCommandHandler,
    DeleteUserCommandHandler,
]
const queryHandlers = [GetUserQueryHandler]
const useCases = [UserUseCases]
const services = [UserServiceProvider, PasswordService]

const providers = [
    ...services,
    ...eventHandlers,
    ...commandHandlers,
    ...queryHandlers,
    ...useCases,
]

@Module({
    imports: [EventBusProviderModule, CqrsModule, UserInfrastructureModule],
    providers,
    exports: providers,
})
export class UserModule {}
