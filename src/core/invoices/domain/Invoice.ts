import { Invoice as IInvoice } from './interfaces/Invoice'
import { AggregateRoot } from '@nestjs/cqrs'
import { DateVo } from './vo/Date'
import { Product } from './interfaces/Product'

export interface InvoiceProperties {
    id?: number
    userId: number
    products: Product[]
    date: DateVo
    amount?: number
    address: string
}

export class Invoice extends AggregateRoot {
    invoice: InvoiceProperties

    constructor(properties: InvoiceProperties) {
        super()
        this.invoice = properties
    }

    toPrimitives(): IInvoice {
        return {
            id: this.invoice?.id,
            products: this.invoice.products,
            userId: this.invoice.userId,
            date: this.invoice.date.getValue(),
            amount: this.invoice.amount,
            address: this.invoice.address,
        }
    }
}
