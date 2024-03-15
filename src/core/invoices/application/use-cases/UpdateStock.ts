import { Invoice as IInvoice } from '@core/invoices/domain/interfaces/Invoice'
import { ProductRepository } from '@core/invoices/domain/ports/outbound/repositories/ProductRepository'
import { PRODUCT_REPOSITORY } from '@core/invoices/shared/dependency-tokens/repositories'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateStockUseCases {
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository

    async create(invoice: IInvoice): Promise<void> {
        invoice.products.forEach((product) => {
            this.productRepository.updateStock(product.id, product.quantity)
        })
    }
}
