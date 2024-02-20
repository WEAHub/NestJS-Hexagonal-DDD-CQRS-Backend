import { Controller, Get, UseFilters } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '../../exception-filters/global-exception.filter'
import { CurrentUser } from '@infrastructure/http-server/decorators/current-user.decorator'
import { Token } from '@core/domain/interfaces/Token'
import { User } from '@core/domain/interfaces/User'
import { GetUserQuery } from '@core/application/features/queries/user/GetUserQuery'

@ApiTags('User')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class UserController {
    constructor(
        private command: CommandBus,
        private query: QueryBus,
    ) {}

    @ApiInternalServerErrorResponse({ description: 'Error server' })
    @Get()
    async getUser(@CurrentUser() user: Token): Promise<User> {
        return this.query.execute(new GetUserQuery(user))
    }
}
