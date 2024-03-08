import { Invoice } from '@core/invoices/domain/interfaces/Invoice'

export interface InvoicesRepository {
    findByUserId(userId: number): Promise<Invoice>
    findById(id: number): Promise<Invoice>
    findAll(): Promise<Invoice[]>
    save(invoice: Invoice): Promise<Invoice>
    delete(id: number): Promise<boolean>
}
