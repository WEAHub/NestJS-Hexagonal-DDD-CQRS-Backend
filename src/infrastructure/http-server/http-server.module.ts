import { Module } from '@nestjs/common'
import { CoreModule } from '@core/core.module'
import { LoginController } from './controllers/auth/login.controller'
import { RefreshTokenController } from './controllers/auth/refresh-token.controller'
import { PassportModule } from '@nestjs/passport'
import { APP_GUARD } from '@nestjs/core'
import { PublicGuard } from './guards/public.guard'
import { JwtStrategy } from './auth-strategies/jwt.strategy'
import { JwtRefreshStrategy } from './auth-strategies/jwt-refresh.strategy'

@Module({
    imports: [CoreModule, PassportModule],
    controllers: [
        //AUTH
        LoginController,
        RefreshTokenController,
    ],
    providers: [
        JwtStrategy,
        JwtRefreshStrategy,
        {
            provide: APP_GUARD,
            useClass: PublicGuard,
        },
    ],
})
export class HttpServerModule {}
