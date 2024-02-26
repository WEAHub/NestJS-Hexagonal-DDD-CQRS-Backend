import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetAllProductQuery } from '../GetAllProduct'
import { ProductUseCases } from '@core/products/application/services/ProductUseCases'
import { Product } from '@core/products/domain/interfaces/Product'

@QueryHandler(GetAllProductQuery)
export class GetAllProductHandler implements IQueryHandler<GetAllProductQuery> {
    constructor(private product: ProductUseCases) {}

    execute(): Promise<Product[]> {
        return this.product.findAll()
    }
}
