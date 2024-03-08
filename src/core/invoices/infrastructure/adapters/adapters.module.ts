import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresInvoicesRepository } from './secondary/db/postgres-Invoices.repository'
import { INVOICES_REPOSITORY } from '@core/Invoices/shared/dependency-tokens/repositories'
import { InvoiceEntity } from './secondary/db/entities/invoice.entity'

const controllers = [
    /*     
    GetInvoicesController,
    CreateInvoicesController,
    DeleteInvoicesController,
    UpdateInvoicesController, 
    */
]

const providers = [
    PostgresInvoicesRepository,
    {
        provide: INVOICES_REPOSITORY,
        useExisting: PostgresInvoicesRepository,
    },
]

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([InvoiceEntity])],
    providers: providers,
    controllers,
    exports: providers,
})
export class InvoicesAdaptersModule {}
