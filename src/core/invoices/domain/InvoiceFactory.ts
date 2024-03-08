import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { Invoice as IInvoice } from './interfaces/Invoice'
import { Invoice, InvoiceProperties } from './Invoice'
import { DateVo } from './vo/Date'
import { Product } from './interfaces/Product'

export class InvoiceFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

    create(options: IInvoice): Invoice {
        const amount: number = this.calculateAmount(options.products)

        const properties: InvoiceProperties = {
            ...options, //id
            amount,
            date: new DateVo(options.date),
        }

        const _invoice = new Invoice(properties)
        return this.eventPublisher.mergeObjectContext(_invoice)
    }

    private calculateAmount(products: Product[]): number {
        return products.reduce((p, n) => {
            const { modifiers, price } = n
            const _price = modifiers?.discountPrice ?? price
            return p + _price * n.quantity
        }, 0)
    }
}
