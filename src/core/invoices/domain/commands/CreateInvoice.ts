import { InvoicePaymentDto } from '@core/invoices/shared/dto/InvoicePayment.dto'

export class CreateInvoiceCommand {
    constructor(
        public readonly userId: number,
        public readonly paymentBody: InvoicePaymentDto,
    ) {}
}
