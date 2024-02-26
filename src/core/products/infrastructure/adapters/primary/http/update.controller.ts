import { UpdateProductCommand } from '@core/products/application/entrypoint/commands/UpdateProduct'
import { Product } from '@core/products/domain/interfaces/Product'
import { UpdateProductControllerPort } from '@core/products/domain/ports/inbound/controllers/update.controller'
import { UpdateProductDto } from '@core/products/shared/dto/UpdateProduct.dto'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { Body, Controller, Param, Patch, UseFilters } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Product Update Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('product')
export class UpdateProductController
    implements
        UpdateProductControllerPort<
            number,
            UpdateProductDto,
            AppResponse<Product>
        >
{
    constructor(private command: CommandBus) {}

    @IsAdmin()
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() product: UpdateProductDto,
    ): Promise<AppResponse<Product>> {
        return await this.command.execute(new UpdateProductCommand(id, product))
    }
}
