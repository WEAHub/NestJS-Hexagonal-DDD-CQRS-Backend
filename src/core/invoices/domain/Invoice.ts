import { Invoice as IInvoice } from './interfaces/Invoice'
import { AggregateRoot } from '@nestjs/cqrs'
import { DateVo } from './vo/Date'
import { Product } from './interfaces/Product'
import { UserLocation } from './interfaces/UserLocation'
import { CreatedInvoiceEvent } from './events/InvoiceCreated'

export interface InvoiceProperties {
    id?: number
    userId: number
    products: Product[]
    date: DateVo
    amount?: number
    shipping: UserLocation
}

export class Invoice extends AggregateRoot {
    invoice: InvoiceProperties

    constructor(properties: InvoiceProperties) {
        super()
        this.invoice = properties
    }

    paid(): void {
        this.apply(new CreatedInvoiceEvent(this.toPrimitives()))
    }

    toPrimitives(): IInvoice {
        return {
            id: this.invoice?.id,
            products: this.invoice.products,
            userId: this.invoice.userId,
            date: this.invoice.date.getValue(),
            amount: this.invoice.amount,
            shipping: this.invoice.shipping,
        }
    }
}
