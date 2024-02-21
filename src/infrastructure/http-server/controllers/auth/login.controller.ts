import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '../../exception-filters/global-exception.filter'
import { Public } from '@infrastructure/http-server/decorators/is-public.decorator'
import { LoginCommand } from '@core/auth/application/entrypoint/commands/Login'
import { LoginSuccessDto } from '@core/auth/shared/dto/LoginSuccess.dto'
import { LoginControllerPort } from '@core/auth/domain/ports/outbound/controllers/login.controller.interface'
import { LoginDto } from '@core/auth/shared/dto/Login.dto'

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
