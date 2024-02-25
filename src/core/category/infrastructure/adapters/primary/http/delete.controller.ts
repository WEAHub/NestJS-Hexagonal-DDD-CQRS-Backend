import { DeleteCategoryCommand } from '@core/category/application/entrypoint/commands/DeleteCategory'
import { DeleteCategoryControllerPort } from '@core/category/domain/ports/inbound/controllers/delete.controller'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import {
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Param,
    UseFilters,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Category Delete Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('category')
export class DeleteCategoryController
    implements DeleteCategoryControllerPort<number, AppResponse<null>>
{
    constructor(private command: CommandBus) {}

    @Delete(':id')
    @IsAdmin()
    @HttpCode(HttpStatus.CREATED)
    async delete(@Param('id') id: number): Promise<AppResponse<null>> {
        return await this.command.execute(new DeleteCategoryCommand(id))
    }
}
