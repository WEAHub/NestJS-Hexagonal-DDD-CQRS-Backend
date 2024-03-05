import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CartsInfrastructureModule } from './infrastructure/infrastructure.module'

import UseCases from './application/use-cases'
import Events from './application/events'
import CommandHandlers from './application/commands'
import Queries from './application/queries'
import { CartFactory } from './domain/CartFactory'

const Services = []

const providers = [
    CartFactory,
    ...CommandHandlers,
    ...Queries,
    ...Events,
    ...UseCases,
    ...Services,
]

@Module({
    imports: [CqrsModule, CartsInfrastructureModule],
    providers,
    exports: providers,
})
export class CartsModule {}
