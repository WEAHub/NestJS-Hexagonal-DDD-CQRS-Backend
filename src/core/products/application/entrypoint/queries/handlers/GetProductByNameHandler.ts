import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetProductByNameQuery } from '../GetProductByName'
import { ProductUseCases } from '@core/products/application/services/ProductUseCases'
import { Product } from '@core/products/domain/interfaces/Product'

@QueryHandler(GetProductByNameQuery)
export class GetProductByNameQueryHandler
    implements IQueryHandler<GetProductByNameQuery>
{
    constructor(private product: ProductUseCases) {}

    execute(product: GetProductByNameQuery): Promise<Product> {
        return this.product.findByName(product.name)
    }
}
