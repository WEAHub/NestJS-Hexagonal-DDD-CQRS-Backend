import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetProductByIdQuery } from '../../domain/queries/GetProductById'
import { Product } from '@core/products/domain/interfaces/Product'
import { GetProductUseCases } from '../use-cases/GetProductUseCases'

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
    implements IQueryHandler<GetProductByIdQuery>
{
    constructor(private useCases: GetProductUseCases) {}

    execute(product: GetProductByIdQuery): Promise<Product> {
        return this.useCases.findById(product.id)
    }
}
