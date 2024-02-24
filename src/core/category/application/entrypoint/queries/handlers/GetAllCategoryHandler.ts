import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetAllCategoryQuery } from '../GetAllCategory'
import { CategoryUseCases } from '@core/category/application/services/CategoryUseCases'
import { Category } from '@core/category/domain/interfaces/Category'

@QueryHandler(GetAllCategoryQuery)
export class GetAllCategoryHandler
    implements IQueryHandler<GetAllCategoryQuery>
{
    constructor(private category: CategoryUseCases) {}

    execute(): Promise<Category[]> {
        return this.category.findAll()
    }
}
