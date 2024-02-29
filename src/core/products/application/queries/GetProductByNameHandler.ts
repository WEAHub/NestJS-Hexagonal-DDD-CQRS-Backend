import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetProductByNameQuery } from '../../domain/queries/GetProductByName'
import { Product } from '@core/products/domain/interfaces/Product'
import { GetProductUseCases } from '../use-cases/GetProductUseCases'

@QueryHandler(GetProductByNameQuery)
export class GetProductByNameQueryHandler
    implements IQueryHandler<GetProductByNameQuery>
{
    constructor(private useCases: GetProductUseCases) {}

    execute(product: GetProductByNameQuery): Promise<Product> {
        return this.useCases.findByName(product.name)
    }
}
