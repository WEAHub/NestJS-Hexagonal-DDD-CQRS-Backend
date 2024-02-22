import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PersistenceModule } from '@persistance/persistence.module'

const featureModules = [
    AuthModule, //
    UserModule,
]

@Module({
    imports: [
        JwtModule.register({ global: true }),
        CqrsModule,
        PersistenceModule,
        ...featureModules,
    ],
    exports: [CqrsModule],
})
export class CoreModule {}
