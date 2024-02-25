import { Body, Controller, Put, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { User } from '@core/user/domain/interfaces/User'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { EditUserControllerPort } from '@core/user/domain/ports/inbound/controllers/update.controller'
import { EditUserCommand } from '@core/user/application/entrypoint/commands/EditUser'
import { EditUserDto } from '@core/user/shared/dto/EditUser.dto'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'

@ApiTags('Edit User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class EditUserController
    implements EditUserControllerPort<EditUserDto, User>
{
    constructor(private command: CommandBus) {}

    @IsAdmin()
    @Put()
    async update(@Body() user: EditUserDto): Promise<User> {
        return this.command.execute(new EditUserCommand(user))
    }
}
