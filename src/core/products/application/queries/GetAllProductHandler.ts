import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetAllProductQuery } from '../../domain/queries/GetAllProduct'
import { Product } from '@core/products/domain/interfaces/Product'
import { Paginated } from '@core/shared/domain/interfaces/Paginated'
import { GetProductUseCases } from '../use-cases/GetProduct'

@QueryHandler(GetAllProductQuery)
export class GetAllProductHandler implements IQueryHandler<GetAllProductQuery> {
    constructor(private useCases: GetProductUseCases) {}

    execute(query: GetAllProductQuery): Promise<Paginated<Product>> {
        return this.useCases.findAll(query.productOptions)
    }
}
