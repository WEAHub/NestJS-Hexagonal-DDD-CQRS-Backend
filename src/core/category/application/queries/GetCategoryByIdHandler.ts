import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Category } from '@core/category/domain/interfaces/Category'
import { GetCategoryByIdQuery } from '../../domain/queries/GetCategoryById'
import { GetCategoryUseCases } from '../use-cases/GetCategory'

@QueryHandler(GetCategoryByIdQuery)
export class GetCategoryByIdHandler
    implements IQueryHandler<GetCategoryByIdQuery>
{
    constructor(private category: GetCategoryUseCases) {}

    execute(category: GetCategoryByIdQuery): Promise<Category> {
        return this.category.findById(category.id)
    }
}
