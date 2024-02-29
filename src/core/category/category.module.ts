import { EventBusProviderModule } from '@core/shared/domain/services/eventbus/event-bus.service.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CategoryInfrastructureModule } from './infrastructure/infrastructure.module'

import { CategoryFactory } from './domain/CategoryFactory'
import { CreateCategoryCommandHandler } from './application/commands/CreateCategoryHandler'
import { DeleteCategoryCommandHandler } from './application/commands/DeleteCategoryHandler'
import { UpdateCategoryCommandHandler } from './application/commands/UpdateCategoryHandler'
import { CreatedCategoryEventHandler } from './application/events/CreatedCategoryEventHandler'
import { DeletedCategoryEventHandler } from './application/events/DeletedCategoryEventHandler'
import { UpdatedCategoryEventHandler } from './application/events/UpdatedCategoryEventHandler'
import { GetAllCategoryHandler } from './application/queries/handlers/GetAllCategoryHandler'
import { GetCategoryByIdHandler } from './application/queries/handlers/GetCategoryByIdHandler'
import { GetCategoryByNameQueryHandler } from './application/queries/handlers/GetCategoryByNameHandler'
import { CreateCategoryUseCase } from './application/use-cases/CreateCategoryUseCases'
import { DeleteCategoryUseCase } from './application/use-cases/DeleteCategoryUseCases'
import { GetCategoryUseCases } from './application/use-cases/GetCategoryUseCases'
import { UpdateCategoryUseCase } from './application/use-cases/UpdateCategoryUseCases'

const eventHandlers = [
    CreatedCategoryEventHandler,
    UpdatedCategoryEventHandler,
    DeletedCategoryEventHandler,
]

const commandHandlers = [
    CreateCategoryCommandHandler,
    DeleteCategoryCommandHandler,
    UpdateCategoryCommandHandler,
]

const queryHandlers = [
    GetAllCategoryHandler,
    GetCategoryByNameQueryHandler,
    GetCategoryByIdHandler,
]

const useCases = [
    CreateCategoryUseCase,
    GetCategoryUseCases,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
]

const services = []

const domain = [CategoryFactory]

const providers = [
    ...domain,
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
