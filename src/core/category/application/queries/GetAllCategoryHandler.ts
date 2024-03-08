import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetAllCategoryQuery } from '../../domain/queries/GetAllCategory'
import { Category } from '@core/category/domain/interfaces/Category'
import { GetCategoryUseCases } from '../use-cases/GetCategory'

@QueryHandler(GetAllCategoryQuery)
export class GetAllCategoryHandler
    implements IQueryHandler<GetAllCategoryQuery>
{
    constructor(private category: GetCategoryUseCases) {}

    execute(): Promise<Category[]> {
        return this.category.findAll()
    }
}
