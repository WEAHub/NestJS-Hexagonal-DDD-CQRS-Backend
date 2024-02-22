import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { LoginCommand } from '@core/auth/application/entrypoint/commands/Login'
import { LoginSuccessDto } from '@core/auth/shared/dto/LoginSuccess.dto'
import { LoginControllerPort } from '@core/auth/domain/ports/inbound/controllers/login.controller.port'
import { LoginDto } from '@core/auth/shared/dto/Login.dto'
import { Public } from '@core/shared/infrastructure/decorators/is-public.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'

@ApiTags('Auth Login Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('auth')
export class LoginController
    implements LoginControllerPort<LoginDto, LoginSuccessDto>
{
    constructor(private command: CommandBus) {}

    @Public()
    @ApiInternalServerErrorResponse({ description: 'Error server' })
    @Post('/login')
    async login(@Body() user: LoginDto): Promise<LoginSuccessDto> {
        return await this.command.execute(new LoginCommand(user))
    }
}