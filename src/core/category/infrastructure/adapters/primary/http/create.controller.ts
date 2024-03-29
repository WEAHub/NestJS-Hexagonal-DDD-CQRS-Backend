import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseFilters,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { Category } from '@core/category/domain/interfaces/Category'
import { CreateCategoryControllerPort } from '@core/category/domain/ports/inbound/controllers/create.controller'
import { CreateCategoryDto } from '@core/category/shared/dto/CreateCategory.dto'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'
import { CreateCategoryCommand } from '@core/category/domain/commands/CreateCategory'

@ApiTags('Category Create Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('category')
export class CreateCategoryController
    implements CreateCategoryControllerPort<CreateCategoryDto, Category>
{
    constructor(private command: CommandBus) {}

    @Post()
    @IsAdmin()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() category: CreateCategoryDto): Promise<Category> {
        return await this.command.execute(new CreateCategoryCommand(category))
    }
}
