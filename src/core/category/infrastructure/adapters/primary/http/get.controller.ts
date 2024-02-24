import { Controller, Get, Param, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { QueryBus } from '@nestjs/cqrs'
import { Public } from '@core/shared/infrastructure/decorators/is-public.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { GetCategoryControllerPort } from '@core/category/domain/ports/inbound/controllers/get.controller'
import { Category } from '@core/category/domain/interfaces/Category'
import { GetAllCategoryQuery } from '@core/category/application/entrypoint/queries/GetAllCategory'
import { GetCategoryByNameQuery } from '@core/category/application/entrypoint/queries/GetCategoryByName'
import { GetCategoryByIdQuery } from '@core/category/application/entrypoint/queries/GetCategoryById'

@ApiTags('Category Get Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('category')
export class GetCategoryController
    implements GetCategoryControllerPort<string, number, Category>
{
    constructor(private query: QueryBus) {}

    @Public()
    @Get()
    async findAll(): Promise<Category[]> {
        return await this.query.execute(new GetAllCategoryQuery())
    }

    @Public()
    @Get('name/:name')
    async findByName(@Param('name') name: string): Promise<Category> {
        return await this.query.execute(new GetCategoryByNameQuery(name))
    }

    @Public()
    @Get(':id')
    async findById(@Param('id') id: number): Promise<Category> {
        return await this.query.execute(new GetCategoryByIdQuery(id))
    }
}
