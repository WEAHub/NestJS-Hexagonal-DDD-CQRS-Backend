import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

const featureModules = [
    AuthModule, //
    UserModule,
]

@Module({
    imports: [
        JwtModule.register({ global: true }),
        CqrsModule,
        ...featureModules,
    ],
    exports: [CqrsModule],
})
export class CoreModule {}
