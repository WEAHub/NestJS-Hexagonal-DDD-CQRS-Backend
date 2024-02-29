import { CreateProductCommand } from '@core/products/domain/commands/CreateProduct'
import { Product } from '@core/products/domain/interfaces/Product'
import { CreateProductControllerPort } from '@core/products/domain/ports/inbound/controllers/create.controller'
import { CreateProductDto } from '@core/products/shared/dto/CreateProduct.dto'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Product Create Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('product')
export class CreateProductController
    implements
        CreateProductControllerPort<CreateProductDto, AppResponse<Product>>
{
    constructor(private command: CommandBus) {}

    @IsAdmin()
    @Post()
    async create(
        @Body() product: CreateProductDto,
    ): Promise<AppResponse<Product>> {
        return await this.command.execute(new CreateProductCommand(product))
    }
}
