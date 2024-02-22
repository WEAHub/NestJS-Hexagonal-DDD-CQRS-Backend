import { Controller, Get, UseFilters } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { QueryBus } from '@nestjs/cqrs'
import { Token } from '@core/auth/domain/interfaces/Token'
import { GetUserQuery } from '@core/user/application/entrypoint/queries/GetUserQuery'
import { User } from '@core/user/domain/interfaces/User'
import { GetUserControllerPort } from '@core/user/domain/ports/inbound/controllers/getUser.controller'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { CurrentUser } from '@core/shared/infrastructure/decorators/current-user.decorator'

@ApiTags('Get User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class GetUserController implements GetUserControllerPort<Token, User> {
    constructor(private query: QueryBus) {}

    @ApiInternalServerErrorResponse({ description: 'Error server' })
    @Get()
    async getUser(@CurrentUser() user: Token): Promise<User> {
        return this.query.execute(new GetUserQuery(user))
    }
}
