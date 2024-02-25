import { Body, Controller, Param, Patch, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { Category } from '@core/category/domain/interfaces/Category'
import { UpdateCategoryDto } from '@core/category/shared/dto/UpdateCategory.dto'
import { UpdateCategoryCommand } from '@core/category/application/entrypoint/commands/UpdateCategory'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'
import { UpdateCategoryControllerPort } from '@core/category/domain/ports/inbound/controllers/update.controller'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'

@ApiTags('Category Update Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('category')
export class UpdateCategoryController
    implements
        UpdateCategoryControllerPort<
            number,
            UpdateCategoryDto,
            AppResponse<Category>
        >
{
    constructor(private command: CommandBus) {}

    @Patch(':id')
    @IsAdmin()
    async update(
        @Param('id') id: number,
        @Body() category: UpdateCategoryDto,
    ): Promise<AppResponse<Category>> {
        return await this.command.execute(
            new UpdateCategoryCommand(id, category),
        )
    }
}
