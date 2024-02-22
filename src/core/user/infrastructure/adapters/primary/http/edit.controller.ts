import { Controller, Post, UseFilters } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { QueryBus } from '@nestjs/cqrs'
import { User } from '@core/user/domain/interfaces/User'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { CurrentUser } from '@core/shared/infrastructure/decorators/current-user.decorator'
import { EditUserControllerPort } from '@core/user/domain/ports/inbound/controllers/editUser.controller'
import { EditUserCommand } from '@core/user/application/entrypoint/commands/EditUser'

@ApiTags('Get User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class EditUserController implements EditUserControllerPort<User, User> {
    constructor(private query: QueryBus) {}

    @ApiInternalServerErrorResponse({ description: 'Error server' })
    @Post()
    async editUser(@CurrentUser() user: User): Promise<User> {
        return this.query.execute(new EditUserCommand(user))
    }
}
