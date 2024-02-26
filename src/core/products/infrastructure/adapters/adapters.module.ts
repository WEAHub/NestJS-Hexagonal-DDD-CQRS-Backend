import { Module } from '@nestjs/common'
import { InMemoryEventBus } from '@core/shared/domain/services/eventbus/in-memory-event-bus.service'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductEntity } from './secondary/db/entities/Product.entity'
import { GetProductController } from './primary/http/get.controller'
import {
    CATEGORY_REPOSITORY,
    PRODUCT_REPOSITORY,
} from '@core/products/shared/dependency-tokens/repositories'
import { PostgresProductRepository } from './secondary/db/postgres-product.repository'
import { CategoryEntity } from './secondary/db/entities/category.entity'
import { CreateProductController } from './primary/http/create.controller'
import { PostgresCategoryRepository } from './secondary/db/postgres-category.repository'
import { UpdateProductController } from './primary/http/update.controller'

const controllers = [
    CreateProductController,
    GetProductController,
    UpdateProductController,
]

const providers = [
    PostgresProductRepository,
    PostgresCategoryRepository,
    InMemoryEventBus,
    {
        provide: PRODUCT_REPOSITORY,
        useExisting: PostgresProductRepository,
    },
    {
        provide: CATEGORY_REPOSITORY,
        useExisting: PostgresCategoryRepository,
    },
]

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    ],
    controllers,
    providers: providers,
    exports: providers,
})
export class ProductAdaptersModule {}
