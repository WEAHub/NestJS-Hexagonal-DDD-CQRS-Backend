import { Body, Controller, Param, Put, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { UpdateCartControllerPort } from '@core/carts/domain/ports/inbound/controllers/update.controller'
import { UpdateCartDto } from '@core/carts/shared/dto/UpdateCart.dto'
import { Cart } from '@core/carts/domain/interfaces/Cart'
import { UpdateCartCommand } from '@core/carts/domain/commands/UpdateCart'

@ApiTags('Edit User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('carts')
export class UpdateCartController
    implements UpdateCartControllerPort<UpdateCartDto, AppResponse<Cart>>
{
    constructor(private command: CommandBus) {}

    @Put(':id')
    async update(
        @Param('id') id: number,
        // TODO: Se le puede aplicar el decorador @CurrentUser para ahorrarle una query al caso de uso
        @Body() products: UpdateCartDto,
    ): Promise<AppResponse<Cart>> {
        return this.command.execute(
            new UpdateCartCommand(id, products.products),
        )
    }
}
