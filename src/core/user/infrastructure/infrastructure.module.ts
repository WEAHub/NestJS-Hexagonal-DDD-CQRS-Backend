import { JwtRefreshStrategy } from '@core/shared/infrastructure/auth-strategies/jwt-refresh.strategy'
import { JwtStrategy } from '@core/shared/infrastructure/auth-strategies/jwt.strategy'
import { PublicGuard } from '@core/shared/infrastructure/guards/public.guard'
import { APP_GUARD } from '@nestjs/core'
import { PassportModule } from '@nestjs/passport'
import { UserAdaptersModule } from './adapters/adapters.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
    imports: [CqrsModule, PassportModule, UserAdaptersModule],
    providers: [
        JwtStrategy,
        JwtRefreshStrategy,
        {
            provide: APP_GUARD,
            useClass: PublicGuard,
        },
    ],
    exports: [UserAdaptersModule],
})
export class UserInfrastructureModule {}
