import { EventBusProviderModule } from '@core/shared/domain/services/eventbus/event-bus.provider.module'
import { AdaptersModule } from '@infrastructure/adapters/adapters.module'
import { PersistenceModule } from '@infrastructure/persistance/persistence.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GetUserQueryHandler } from './application/entrypoint/queries/handlers/GetUserQueryHandler'
import { UserUseCases } from './application/services/UserUseCases'
import { UserServiceProvider } from './domain/services/UserService'

const eventHandlers = []
const commandHandlers = []
const queryHandlers = [GetUserQueryHandler]
const useCases = [UserUseCases]
const services = [UserServiceProvider]

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
export class UserModule {}
