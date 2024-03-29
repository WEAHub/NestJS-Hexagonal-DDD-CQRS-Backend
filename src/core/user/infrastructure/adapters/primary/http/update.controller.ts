import { Body, Controller, Param, Put, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { User } from '@core/user/domain/interfaces/User'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { UpdateUserControllerPort } from '@core/user/domain/ports/inbound/controllers/update.controller'
import { UpdateUserCommand } from '@core/user/domain/commands/UpdateUser'
import { EditUserDto } from '@core/user/shared/dto/EditUser.dto'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { CurrentUser } from '@core/shared/infrastructure/decorators/current-user.decorator'

@ApiTags('Edit User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class UpdateUserController
    implements UpdateUserControllerPort<EditUserDto, AppResponse<User>>
{
    constructor(private command: CommandBus) {}

    @Put()
    async update(
        @CurrentUser() user: User,
        @Body() userProps: EditUserDto,
    ): Promise<AppResponse<User>> {
        return this.command.execute(new UpdateUserCommand(user.id, userProps))
    }

    @IsAdmin()
    @Put(':id')
    async updateById(
        @Param('id') id: number,
        // TODO: Se le puede aplicar el decorador @CurrentUser para ahorrarle una query al caso de uso
        @Body() user: EditUserDto,
    ): Promise<AppResponse<User>> {
        return this.command.execute(new UpdateUserCommand(id, user))
    }
}
