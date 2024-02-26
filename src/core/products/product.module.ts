import { EventBusProviderModule } from '@core/shared/domain/services/eventbus/event-bus.service.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GetAllProductHandler } from './application/entrypoint/queries/handlers/GetAllProductHandler'
import { ProductUseCases } from './application/services/ProductUseCases'
import { ProductInfrastructureModule } from './infrastructure/infrastructure.module'
import { CreateProductCommandHandler } from './application/entrypoint/commands/handlers/CreateProductHandler'
import { CategoryServiceProvider } from './domain/services/CategoryService'
import { ProductServiceProvider } from './domain/services/ProductService'
import { GetProductByIdHandler } from './application/entrypoint/queries/handlers/GetProductByIdHandler'
import { GetProductByNameQueryHandler } from './application/entrypoint/queries/handlers/GetProductByNameHandler'
import { UpdateProductCommandHandler } from './application/entrypoint/commands/handlers/UpdateProductHandler'
import { DeleteProductCommandHandler } from './application/entrypoint/commands/handlers/DeleteProduct'

const eventHandlers = []
const commandHandlers = [
    CreateProductCommandHandler,
    UpdateProductCommandHandler,
    DeleteProductCommandHandler,
]
const queryHandlers = [
    GetAllProductHandler,
    GetProductByIdHandler,
    GetProductByNameQueryHandler,
]
const useCases = [ProductUseCases]
const services = [CategoryServiceProvider, ProductServiceProvider]

const providers = [
    ...services,
    ...eventHandlers,
    ...commandHandlers,
    ...queryHandlers,
    ...useCases,
]

@Module({
    imports: [CqrsModule, EventBusProviderModule, ProductInfrastructureModule],
    providers,
    exports: providers,
})
export class ProductModule {}
