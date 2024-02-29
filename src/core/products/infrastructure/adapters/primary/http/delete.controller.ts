import { DeleteProductCommand } from '@core/products/domain/commands/DeleteProduct'
import { DeleteProductControllerPort } from '@core/products/domain/ports/inbound/controllers/delete.controller'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { Controller, Delete, Param, UseFilters } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Product Delete Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('product')
export class DeleteProductController
    implements DeleteProductControllerPort<number, AppResponse<null>>
{
    constructor(private command: CommandBus) {}

    @IsAdmin()
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<AppResponse<null>> {
        return await this.command.execute(new DeleteProductCommand(id))
    }
}
