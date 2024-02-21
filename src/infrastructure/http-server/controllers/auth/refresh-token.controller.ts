import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { GlobalExceptionFilter } from '../../exception-filters/global-exception.filter'
import { CurrentUser } from '@infrastructure/http-server/decorators/current-user.decorator'
import { RefreshJwtGuard } from '@infrastructure/http-server/guards/jwt-refresh.guard'
import { Public } from '@infrastructure/http-server/decorators/is-public.decorator'
import { RefreshTokenCommand } from '@core/auth/application/entrypoint/commands/RefreshToken'
import { Token } from '@core/auth/domain/interfaces/Token'
import { LoginSuccessDto } from '@core/auth/shared/dto/LoginSuccess.dto'
import { RefreshTokenControllerPort } from '@core/auth/domain/ports/outbound/controllers/refresh-token.controller.interface'

@ApiTags('Auth Refresh Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('auth')
export class RefreshTokenController
    implements RefreshTokenControllerPort<Token, LoginSuccessDto>
{
    constructor(private command: CommandBus) {}

    @Public()
    @UseGuards(RefreshJwtGuard)
    @ApiInternalServerErrorResponse({ description: 'Error server' })
    @Get('/refresh')
    async refresh(@CurrentUser() user: Token): Promise<LoginSuccessDto> {
        return await this.command.execute(new RefreshTokenCommand(user))
    }
}
