import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { RefreshTokenCommand } from '@core/auth/application/entrypoint/commands/RefreshToken'
import { Token } from '@core/auth/domain/interfaces/Token'
import { LoginSuccessDto } from '@core/auth/shared/dto/LoginSuccess.dto'
import { RefreshTokenControllerPort } from '@core/auth/domain/ports/inbound/controllers/refresh-token.controller.port'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { RefreshJwtGuard } from '@core/shared/infrastructure/guards/jwt-refresh.guard'
import { CurrentUser } from '@core/shared/infrastructure/decorators/current-user.decorator'
import { Public } from '@core/shared/infrastructure/decorators/is-public.decorator'

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
