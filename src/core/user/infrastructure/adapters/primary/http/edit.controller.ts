import { Body, Controller, Put, UseFilters, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { User } from '@core/user/domain/interfaces/User'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { EditUserControllerPort } from '@core/user/domain/ports/inbound/controllers/editUser.controller'
import { EditUserCommand } from '@core/user/application/entrypoint/commands/EditUser'
import { IsAdminGuard } from '@core/shared/infrastructure/guards/is-admin.guard'
import { EditUserDto } from '@core/user/shared/dto/EditUser.dto'

@ApiTags('Edit User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class EditUserController
    implements EditUserControllerPort<EditUserDto, User>
{
    constructor(private command: CommandBus) {}

    @UseGuards(IsAdminGuard)
    @Put()
    async editUser(@Body() user: EditUserDto): Promise<User> {
        return this.command.execute(new EditUserCommand(user))
    }
}
