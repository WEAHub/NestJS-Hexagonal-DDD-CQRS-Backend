import { Controller, Get, UseFilters } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { QueryBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '../../exception-filters/global-exception.filter'
import { CurrentUser } from '@infrastructure/http-server/decorators/current-user.decorator'
import { Token } from '@core/auth/domain/interfaces/Token'
import { GetUserQuery } from '@core/user/application/entrypoint/queries/GetUserQuery'
import { User } from '@core/user/domain/interfaces/User'
import { GetUserControllerPort } from '@core/user/domain/ports/outbound/controllers/getUser.controller'

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
