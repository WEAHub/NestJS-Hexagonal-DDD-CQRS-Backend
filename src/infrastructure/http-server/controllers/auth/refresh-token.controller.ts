import { Controller, Get, UseFilters, UseGuards  } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { LoginSuccessDto } from "@core/shared/dto/LoginSuccess.dto";
import { GlobalExceptionFilter } from "../../exception-filters/global-exception.filter";
import { RefreshTokenCommand } from "@core/application/features/commands/auth/RefreshToken";
import { CurrentUser } from "@infrastructure/http-server/decorators/current-user.decorator";
import { AuthorizationHeader } from "@infrastructure/http-server/decorators/authorization-header.decorator";
import { Token } from "@core/domain/interfaces/Token";
import { RefreshJwtGuard } from "@infrastructure/http-server/guards/jwt-refresh.guard";
import { Public } from "@infrastructure/http-server/decorators/is-public.decorator";

@ApiTags('Auth')
@UseFilters(GlobalExceptionFilter)
@Controller('auth')
export class RefreshTokenController {

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) {}
    
    @Public()
    @UseGuards(RefreshJwtGuard)
    @ApiInternalServerErrorResponse({ description: 'Error server' })
    @Get('/refresh')
    async refresh(
        @CurrentUser() user: Token, 
        @AuthorizationHeader() authBearer: string
    ): Promise<LoginSuccessDto> {
        return await this.command.execute(
            new RefreshTokenCommand(user, authBearer)
        )
    }


}