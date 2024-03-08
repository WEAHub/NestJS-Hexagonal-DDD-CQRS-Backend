import { Invoice as IInvoice } from './interfaces/Invoice'
import { AggregateRoot } from '@nestjs/cqrs'
import { DateVo } from './vo/Date'
import { NumberVo } from './vo/Number'
import { Product } from './interfaces/Product'

export interface InvoiceProperties {
    id?: number
    userId: NumberVo
    products: Product[]
    date: DateVo
    amount: NumberVo
    address: string
}

export class Invoice extends AggregateRoot {
    invoice: InvoiceProperties
    constructor(properties: InvoiceProperties) {
        super()
        Object.assign(this, properties)
    }

    created(): void {
        //this.apply(new CreatedInvoiceEvent(this.name.getValue()))
    }

    toPrimitives(): IInvoice {
        return {
            id: this.invoice?.id,
            userId: this.invoice.userId.getValue(),
            products: this.invoice.products,
            date: this.invoice.date.getValue(),
            amount: this.invoice.amount.getValue(),
            address: this.invoice.address,
        }
    }
}
