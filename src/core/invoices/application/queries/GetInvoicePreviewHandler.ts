import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetInvoicePreviewQuery } from '@core/invoices/domain/queries/GetInvoicePreview'
import { GetInvoicePreviewUseCases } from '../use-cases/GetInvoicePreview'
import { Invoice } from '@core/invoices/domain/interfaces/Invoice'

@QueryHandler(GetInvoicePreviewQuery)
export class GetInvoicePreviewQueryHandler
    implements IQueryHandler<GetInvoicePreviewQuery>
{
    constructor(private useCases: GetInvoicePreviewUseCases) {}

    execute(query: GetInvoicePreviewQuery): Promise<Invoice> {
        return this.useCases.create(query.user)
    }
}
