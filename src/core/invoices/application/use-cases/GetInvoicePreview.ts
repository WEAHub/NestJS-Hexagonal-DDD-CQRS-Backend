import { InvoiceFactory } from '@core/invoices/domain/InvoiceFactory'
import { Cart } from '@core/invoices/domain/interfaces/Cart'
import { Invoice as IInvoice } from '@core/invoices/domain/interfaces/Invoice'
import { Product } from '@core/invoices/domain/interfaces/Product'
import { User } from '@core/invoices/domain/interfaces/User'
import { CartsRepository } from '@core/invoices/domain/ports/outbound/repositories/CartsRepository'
import { InvoicesRepository } from '@core/invoices/domain/ports/outbound/repositories/InvoicesRepository'
import { ProductRepository } from '@core/invoices/domain/ports/outbound/repositories/ProductRepository'
import {
    CART_REPOSITORY,
    INVOICES_REPOSITORY,
    PRODUCT_REPOSITORY,
} from '@core/invoices/shared/dependency-tokens/repositories'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetInvoicePreviewUseCases {
    @Inject(INVOICES_REPOSITORY)
    private readonly repository: InvoicesRepository

    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartsRepository

    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository

    @Inject()
    private readonly invoiceFactory: InvoiceFactory

    async create(user: User): Promise<IInvoice> {
        const cart: Cart = await this.cartRepository.findByUserId(user.id)

        const productIds: number[] = cart.products.map((p) => p.productId)

        const products: Product[] =
            await this.productRepository.findByArrayIds(productIds)

        products.forEach((p) => {
            const { quantity } = cart.products.find(
                (_p) => _p.productId === p.id,
            )
            p.quantity = quantity
        })

        const id = await this.repository.getNextInvoiceId()
        const _invoice = this.invoiceFactory.create({
            id,
            products,
            address: user.location.address,
            userId: user.id,
            date: new Date(),
        })

        return _invoice.toPrimitives()
    }
}
