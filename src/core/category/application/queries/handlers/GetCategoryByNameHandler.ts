import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Category } from '@core/category/domain/interfaces/Category'
import { GetCategoryByNameQuery } from '../GetCategoryByName'
import { GetCategoryUseCases } from '../../use-cases/GetCategoryUseCases'

@QueryHandler(GetCategoryByNameQuery)
export class GetCategoryByNameQueryHandler
    implements IQueryHandler<GetCategoryByNameQuery>
{
    constructor(private category: GetCategoryUseCases) {}

    execute(category: GetCategoryByNameQuery): Promise<Category> {
        return this.category.findByName(category.name)
    }
}
