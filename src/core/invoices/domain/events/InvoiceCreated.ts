import { DomainEvent } from '@core/shared/ddd/DomainEvent'
import { Invoice } from '../interfaces/Invoice'

export class CreatedInvoiceEvent extends DomainEvent<Invoice> {
    EVENT_NAME = 'shopy.invoice.created'

    constructor(public readonly invoice: Invoice) {
        super(invoice)
    }
}
