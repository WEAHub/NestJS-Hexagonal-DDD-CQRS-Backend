import { Controller, Get, Param, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { QueryBus } from '@nestjs/cqrs'
import { GetUserQuery } from '@core/user/domain/queries/GetUserQuery'
import { User } from '@core/user/domain/interfaces/User'
import { GetUserControllerPort } from '@core/user/domain/ports/inbound/controllers/get.controller'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { CurrentUser } from '@core/shared/infrastructure/decorators/current-user.decorator'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'

@ApiTags('Get User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class GetUserController implements GetUserControllerPort<User, User> {
    constructor(private query: QueryBus) {}

    @Get()
    async get(@CurrentUser() user: User): Promise<User> {
        return this.query.execute(new GetUserQuery(user.id))
    }

    @IsAdmin()
    @Get(':id')
    async getByID(@Param('id') id: number): Promise<User> {
        return this.query.execute(new GetUserQuery(id))
    }
}
