import { Body, Controller, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { LoginSuccessDto } from "@core/shared/dto/LoginSuccess.dto";
import { LoginCommand } from "@application/features/commands/auth/Login";
import { GlobalExceptionFilter } from "../../exception-filters/global-exception.filter";
import { LoginRequest } from "../../model/auth/login.request";
import { Public } from "@infrastructure/http-server/decorators/is-public.decorator";

@ApiTags('Auth')
@UseFilters(GlobalExceptionFilter)
@Controller('auth')
export class LoginController {

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) {}
    
    @Public()
    @ApiInternalServerErrorResponse({ description: 'Error server' })
    @Post('/login')
    async login(@Body() user: LoginRequest): Promise<LoginSuccessDto> {
        return await this.command.execute(
            new LoginCommand(user)
        )
    }


}