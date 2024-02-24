import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { CategoryUseCases } from '@core/category/application/services/CategoryUseCases'
import { Category } from '@core/category/domain/interfaces/Category'
import { GetCategoryByIdQuery } from '../GetCategoryById'

@QueryHandler(GetCategoryByIdQuery)
export class GetCategoryByIdHandler
    implements IQueryHandler<GetCategoryByIdQuery>
{
    constructor(private category: CategoryUseCases) {}

    execute(category: GetCategoryByIdQuery): Promise<Category> {
        return this.category.findById(category.id)
    }
}
