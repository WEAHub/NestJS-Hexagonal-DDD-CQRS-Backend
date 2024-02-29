import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { ProductInfrastructureModule } from './infrastructure/infrastructure.module'
import { ProductFactory } from './domain/ProductFactory'

import UseCases from './application/use-cases'
import Events from './application/events'
import CommandHandlers from './application/commands'
import Queries from './application/queries'

const providers = [
    ProductFactory,
    ...CommandHandlers,
    ...Queries,
    ...Events,
    ...UseCases,
]

@Module({
    imports: [CqrsModule, ProductInfrastructureModule],
    providers,
    exports: providers,
})
export class ProductModule {}
