import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Category } from '@core/category/domain/interfaces/Category'
import { GetCategoryByNameQuery } from '../../domain/queries/GetCategoryByName'
import { GetCategoryUseCases } from '../use-cases/GetCategory'

@QueryHandler(GetCategoryByNameQuery)
export class GetCategoryByNameQueryHandler
    implements IQueryHandler<GetCategoryByNameQuery>
{
    constructor(private category: GetCategoryUseCases) {}

    execute(category: GetCategoryByNameQuery): Promise<Category> {
        return this.category.findByName(category.name)
    }
}
