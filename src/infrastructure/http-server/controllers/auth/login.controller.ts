import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '../../exception-filters/global-exception.filter'
import { LoginRequest } from '../../model/auth/login.request'
import { Public } from '@infrastructure/http-server/decorators/is-public.decorator'
import { LoginCommand } from '@core/auth/application/entrypoint/commands/Login'
import { LoginSuccessDto } from '@core/auth/shared/dto/LoginSuccess.dto'
import { LoginControllerPort } from '@core/auth/domain/ports/outbound/controllers/login.controller.interface'

@ApiTags('Auth')
@UseFilters(GlobalExceptionFilter)
@Controller('auth')
export class LoginController
    implements LoginControllerPort<LoginRequest, LoginSuccessDto>
{
    constructor(private command: CommandBus) {}

    @Public()
    @ApiInternalServerErrorResponse({ description: 'Error server' })
    @Post('/login')
    async login(@Body() user: LoginRequest): Promise<LoginSuccessDto> {
        return await this.command.execute(new LoginCommand(user))
    }
}
