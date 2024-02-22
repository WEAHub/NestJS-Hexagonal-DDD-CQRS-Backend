import {
    Controller,
    Delete,
    Param,
    UseFilters,
    UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { DeleteUserControllerPort } from '@core/user/domain/ports/inbound/controllers/delete.controller'
import { IsAdminGuard } from '@core/shared/infrastructure/guards/is-admin.guard'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { DeleteUserCommand } from '@core/user/application/entrypoint/commands/DeleteUser'

@ApiTags('Edit User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class DeleteUserController
    implements DeleteUserControllerPort<number, AppResponse<null>>
{
    constructor(private command: CommandBus) {}

    @UseGuards(IsAdminGuard)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<AppResponse<null>> {
        return this.command.execute(new DeleteUserCommand(id))
    }
}
