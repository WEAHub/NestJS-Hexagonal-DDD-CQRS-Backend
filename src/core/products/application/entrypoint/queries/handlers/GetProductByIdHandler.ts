import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetProductByIdQuery } from '../GetProductById'
import { ProductUseCases } from '@core/products/application/services/ProductUseCases'
import { Product } from '@core/products/domain/interfaces/Product'

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
    implements IQueryHandler<GetProductByIdQuery>
{
    constructor(private product: ProductUseCases) {}

    execute(Product: GetProductByIdQuery): Promise<Product> {
        return this.product.findById(Product.id)
    }
}
