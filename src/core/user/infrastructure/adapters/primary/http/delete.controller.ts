import { Controller, Delete, Param, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { DeleteUserControllerPort } from '@core/user/domain/ports/inbound/controllers/delete.controller'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { DeleteUserCommand } from '@core/user/application/entrypoint/commands/DeleteUser'
import { IsAdmin } from '@core/shared/infrastructure/decorators/is-admin.decorator'

@ApiTags('Edit User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class DeleteUserController
    implements DeleteUserControllerPort<number, AppResponse<null>>
{
    constructor(private command: CommandBus) {}

    @IsAdmin()
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<AppResponse<null>> {
        return this.command.execute(new DeleteUserCommand(id))
    }
}
