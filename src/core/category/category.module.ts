import { EventBusProviderModule } from '@core/shared/domain/services/eventbus/event-bus.service.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CategoryInfrastructureModule } from './infrastructure/infrastructure.module'
import { GetAllCategoryHandler } from './application/entrypoint/queries/handlers/GetAllCategoryHandler'
import { CategoryUseCases } from './application/services/CategoryUseCases'
import { CategoryServiceProvider } from './domain/services/CategoryService'
import { GetCategoryByNameQueryHandler } from './application/entrypoint/queries/handlers/GetCategoryByNameHandler'
import { GetCategoryByIdHandler } from './application/entrypoint/queries/handlers/GetCategoryByIdHandler'
import { CreateCategoryCommandHandler } from './application/entrypoint/commands/handlers/CreateCategoryHandler'

const eventHandlers = []
const commandHandlers = [CreateCategoryCommandHandler]
const queryHandlers = [
    GetAllCategoryHandler,
    GetCategoryByNameQueryHandler,
    GetCategoryByIdHandler,
]
const useCases = [CategoryUseCases]
const services = [CategoryServiceProvider]

const providers = [
    ...services,
    ...eventHandlers,
    ...commandHandlers,
    ...queryHandlers,
    ...useCases,
]

@Module({
    imports: [EventBusProviderModule, CqrsModule, CategoryInfrastructureModule],
    providers,
    exports: providers,
})
export class CategoryModule {}
