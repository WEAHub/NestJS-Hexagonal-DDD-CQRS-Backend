import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresInvoicesRepository } from './secondary/db/postgres-Invoices.repository'
import {
    CART_REPOSITORY,
    INVOICES_REPOSITORY,
    PRODUCT_REPOSITORY,
} from '@core/invoices/shared/dependency-tokens/repositories'
import { InvoiceEntity } from './secondary/db/entities/invoice.entity'
import { CartEntity } from './secondary/db/entities/cart.entity'
import { ProductEntity } from './secondary/db/entities/Product.entity'
import { PostgresProductRepository } from './secondary/db/postgres-products.repository'
import { PostgresCartsRepository } from './secondary/db/postgres-carts.repository'
import { CreateInvoiceController } from './primary/http/create.controller'
import { GetInvoiceController } from './primary/http/get.controller'

const controllers = [GetInvoiceController, CreateInvoiceController]

const providers = [
    PostgresInvoicesRepository,
    PostgresCartsRepository,
    PostgresProductRepository,
    {
        provide: INVOICES_REPOSITORY,
        useExisting: PostgresInvoicesRepository,
    },
    {
        provide: CART_REPOSITORY,
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
        TypeOrmModule.forFeature([InvoiceEntity, CartEntity, ProductEntity]),
    ],
    providers: providers,
    controllers,
    exports: providers,
})
export class InvoicesAdaptersModule {}
