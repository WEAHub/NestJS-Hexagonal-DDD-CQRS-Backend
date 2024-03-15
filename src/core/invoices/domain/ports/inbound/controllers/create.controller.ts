import { Invoice } from '@core/invoices/domain/interfaces/Invoice'
import { User } from '@core/invoices/domain/interfaces/User'
import { InvoicePaymentDto } from '@core/invoices/shared/dto/InvoicePayment.dto'

export interface CreateInvoiceControllerPort {
    create(user: User, paymentData: InvoicePaymentDto): Promise<Invoice>
}
