import { Invoice } from '@core/invoices/domain/interfaces/Invoice'
import { User } from '@core/invoices/domain/interfaces/User'

export interface GetInvoiceControllerPort {
    get(user: User): Promise<Invoice>
}
