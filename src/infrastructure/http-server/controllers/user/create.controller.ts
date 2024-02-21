import { CreateUserCommand } from '@core/user/application/entrypoint/commands/CreateUser'
import { CreateUserControllerPort } from '@core/user/domain/ports/outbound/controllers/createUser.controller'
import { CreateUserDto } from '@core/user/shared/dto/CreateUser.dto'
import { Public } from '@infrastructure/http-server/decorators/is-public.decorator'
import { GlobalExceptionFilter } from '@infrastructure/http-server/exception-filters/global-exception.filter'
import { AppResponse } from '@infrastructure/http-server/model/app.response'
import {
    UseFilters,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Body,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Create User Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class CreateUserController
    implements CreateUserControllerPort<CreateUserDto, AppResponse>
{
    constructor(private command: CommandBus) {}

    @Post()
    @Public()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() user: CreateUserDto): Promise<AppResponse> {
        return this.command.execute(new CreateUserCommand(user))
    }
}
