import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { Invoice as IInvoice } from './interfaces/Invoice'
import { Invoice, InvoiceProperties } from './Invoice'
import { NumberVo } from './vo/Number'
import { DateVo } from './vo/Date'

export class InvoiceFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

    create(options: IInvoice): Invoice {
        const properties: InvoiceProperties = {
            ...options, //id
            address: options.address,
            products: options.products,
            amount: new NumberVo(options.amount),
            date: new DateVo(options.date),
            userId: new NumberVo(options.userId),
        }

        const _invoice = new Invoice(properties)
        return this.eventPublisher.mergeObjectContext(_invoice)
    }
}
