import { CartsRepository } from '@core/invoices/domain/ports/outbound/repositories/CartsRepository'
import { InvoiceFactory } from '@core/invoices/domain/InvoiceFactory'
import { Invoice as IInvoice } from '@core/invoices/domain/interfaces/Invoice'
import { InvoicesRepository } from '@core/invoices/domain/ports/outbound/repositories/InvoicesRepository'
import { ProductRepository } from '@core/invoices/domain/ports/outbound/repositories/ProductRepository'
import {
    INVOICES_REPOSITORY,
    CART_REPOSITORY,
} from '@core/invoices/shared/dependency-tokens/repositories'
import { InvoicePaymentDto } from '@core/invoices/shared/dto/InvoicePayment.dto'
import { Product as IProduct } from '@core/invoices/domain/interfaces/Product'
import { PRODUCT_REPOSITORY } from '@core/invoices/shared/dependency-tokens/repositories'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'

import { Injectable, Inject, Logger, HttpStatus } from '@nestjs/common'
import { User } from '@core/invoices/domain/interfaces/User'
import { CryptoService } from '@core/shared/domain/services/CryptoService'
import { ValidationException } from '@core/shared/exception/ValidationException'

@Injectable()
export class CreateInvoiceUseCases {
    @Inject(INVOICES_REPOSITORY)
    private readonly repository: InvoicesRepository

    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartsRepository

    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository

    @Inject()
    private readonly invoiceFactory: InvoiceFactory

    @Inject()
    private readonly cryptoService: CryptoService

    async create(
        userId: number,
        paymentBody: InvoicePaymentDto,
    ): Promise<AppResponse<IInvoice>> {
        const cart = await this.cartRepository.findByUserId(userId)
        const productIds: number[] = cart.products.map((p) => p.productId)

        const products: IProduct[] =
            await this.productRepository.findByArrayIds(productIds)

        // set quantity products from cart products
        products.forEach((p) => {
            const { quantity } = cart.products.find(
                (_p) => _p.productId === p.id,
            )
            p.quantity = quantity
        })

        const { paymentData, shipping } = paymentBody
        const _invoice = this.invoiceFactory.create({
            products,
            shipping,
            userId,
            date: new Date(),
        })

        try {
            const paymentDecrypted = this.cryptoService.decrypt(paymentData)
            /**
             * If the payment data is decrypted correctly means the payment succeded.
             */
        } catch (error) {
            throw new ValidationException('Payment validation error')
        }
        const data = await this.repository.save(_invoice.toPrimitives())
        _invoice.invoice.id = data.id
        _invoice.paid()
        _invoice.commit()

        const response: AppResponse<IInvoice> = {
            message: 'Invoice paid successfully!',
            status: HttpStatus.OK,
            data,
        }

        await this.cartRepository.emptyCartByUserId(userId)
        return response
    }
}
