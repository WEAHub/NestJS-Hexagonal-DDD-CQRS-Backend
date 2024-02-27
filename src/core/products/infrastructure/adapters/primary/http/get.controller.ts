import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { QueryBus } from '@nestjs/cqrs'
import { Public } from '@core/shared/infrastructure/decorators/is-public.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { GetProductControllerPort } from '@core/products/domain/ports/inbound/controllers/get.controller'
import { Product } from '@core/products/domain/interfaces/Product'
import { GetAllProductQuery } from '@core/products/application/entrypoint/queries/GetAllProduct'
import { GetProductByIdQuery } from '@core/products/application/entrypoint/queries/GetProductById'
import { GetProductByNameQuery } from '@core/products/application/entrypoint/queries/GetProductByName'
import { GetProductDto } from '@core/products/shared/dto/GetProduct.dto'
import { Paginated } from '@core/products/domain/interfaces/Paginated'

@ApiTags('Product Get Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('product')
export class GetProductController
    implements
        GetProductControllerPort<GetProductDto, Product, Paginated<Product>>
{
    constructor(private query: QueryBus) {}

    @Public()
    @Get()
    async findAll(
        @Query() productOptions: GetProductDto,
    ): Promise<Paginated<Product>> {
        return await this.query.execute(new GetAllProductQuery(productOptions))
    }

    @Public()
    @Get('name/:name')
    async findByName(@Param('name') name: string): Promise<Product> {
        return await this.query.execute(new GetProductByNameQuery(name))
    }

    @Public()
    @Get(':id')
    async findById(@Param('id') id: number): Promise<Product> {
        return await this.query.execute(new GetProductByIdQuery(id))
    }
}
