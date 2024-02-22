import { Public } from '@core/shared/infrastructure/decorators/is-public.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { CreateUserCommand } from '@core/user/application/entrypoint/commands/CreateUser'
import { User } from '@core/user/domain/interfaces/User'
import { CreateUserControllerPort } from '@core/user/domain/ports/inbound/controllers/create.controller'
import { CreateUserDto } from '@core/user/shared/dto/CreateUser.dto'
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
    implements CreateUserControllerPort<CreateUserDto, AppResponse<User>>
{
    constructor(private command: CommandBus) {}

    @Post()
    @Public()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() user: CreateUserDto): Promise<AppResponse<User>> {
        return this.command.execute(new CreateUserCommand(user))
    }
}
