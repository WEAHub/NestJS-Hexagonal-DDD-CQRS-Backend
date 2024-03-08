import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresCartsRepository } from './secondary/db/postgres-carts.repository'
import { CartEntity } from './secondary/db/entities/cart.entity'
import {
    CARTS_REPOSITORY,
    PRODUCT_REPOSITORY,
} from '@core/carts/shared/dependency-tokens/repositories'
import { GetCartController } from './primary/http/get.controller'
import { UpdateCartController } from './primary/http/update.controller'
import { PostgresProductRepository } from './secondary/db/postgres-products.repository'
import { ProductEntity } from './secondary/db/entities/Product.entity'

const controllers = [GetCartController, UpdateCartController]

const providers = [
    PostgresCartsRepository,
    PostgresProductRepository,
    {
        provide: CARTS_REPOSITORY,
        useExisting: PostgresCartsRepository,
    },
    {
        provide: PRODUCT_REPOSITORY,
        useExisting: PostgresProductRepository,
    },
]

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([CartEntity, ProductEntity]),
    ],
    providers: providers,
    controllers,
    exports: providers,
})
export class CartsAdaptersModule {}
