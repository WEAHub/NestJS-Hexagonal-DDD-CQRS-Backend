import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CategoryInfrastructureModule } from './infrastructure/infrastructure.module'
import { CategoryFactory } from './domain/CategoryFactory'
import UseCases from './application/use-cases'
import Events from './application/events'
import CommandHandlers from './application/commands'
import Queries from './application/queries'

const providers = [
    CategoryFactory,
    ...CommandHandlers,
    ...Queries,
    ...Events,
    ...UseCases,
]

@Module({
    imports: [CqrsModule, CategoryInfrastructureModule],
    providers,
    exports: providers,
})
export class CategoryModule {}
