import { Controller, Get, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { QueryBus } from '@nestjs/cqrs'
import { User } from '@core/user/domain/interfaces/User'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { CurrentUser } from '@core/shared/infrastructure/decorators/current-user.decorator'
import { Cart } from '@core/carts/domain/interfaces/Cart'
import { GetCartControllerPort } from '@core/carts/domain/ports/inbound/controllers/get.controller'
import { GetCartByUserIdQuery } from '@core/carts/domain/queries/GetCartByUserIdQuery'

@ApiTags('Get Carts Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('carts')
export class GetCartController implements GetCartControllerPort<User, Cart> {
    constructor(private query: QueryBus) {}

    @Get()
    async get(@CurrentUser() user: User): Promise<Cart> {
        return this.query.execute(new GetCartByUserIdQuery(user.id))
    }
    /* 
    @IsAdmin()
    @Get(':id')
    async getById(@Param('id') id: number): Promise<Cart> {
        return this.query.execute(new GetCartQuery(id))
    } 
    */
}
