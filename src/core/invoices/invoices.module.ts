import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { InvoicesInfrastructureModule } from './infrastructure/infrastructure.module'
import UseCases from './application/use-cases'
import Events from './application/events'
import CommandHandlers from './application/commands'
import Queries from './application/queries'
import { InvoiceFactory } from './domain/InvoiceFactory'
import { CryptoServiceProvider } from '@core/shared/domain/services/CryptoService'

const Services = [CryptoServiceProvider]

const providers = [
    InvoiceFactory,
    ...CommandHandlers,
    ...Queries,
    ...Events,
    ...UseCases,
    ...Services,
]

@Module({
    imports: [CqrsModule, InvoicesInfrastructureModule],
    providers,
    exports: providers,
})
export class InvoicesModule {}
