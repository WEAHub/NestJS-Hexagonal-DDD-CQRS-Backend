import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { CategoryUseCases } from '@core/category/application/services/CategoryUseCases'
import { Category } from '@core/category/domain/interfaces/Category'
import { GetCategoryByNameQuery } from '../GetCategoryByName'

@QueryHandler(GetCategoryByNameQuery)
export class GetCategoryByNameQueryHandler
    implements IQueryHandler<GetCategoryByNameQuery>
{
    constructor(private category: CategoryUseCases) {}

    execute(category: GetCategoryByNameQuery): Promise<Category> {
        return this.category.findByName(category.name)
    }
}
