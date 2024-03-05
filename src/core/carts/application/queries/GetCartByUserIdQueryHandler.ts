import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetCartByUserIdQuery } from '@core/carts/domain/queries/GetCartByUserIdQuery'
import { Cart } from '@core/carts/domain/interfaces/Cart'
import { GetCartUseCases } from '../use-cases/GetCart'

@QueryHandler(GetCartByUserIdQuery)
export class GetCartByUserIdQueryHandler
    implements IQueryHandler<GetCartByUserIdQuery>
{
    constructor(private useCases: GetCartUseCases) {}

    execute(query: GetCartByUserIdQuery): Promise<Cart> {
        return this.useCases.getByUserId(query.userId)
    }
}
