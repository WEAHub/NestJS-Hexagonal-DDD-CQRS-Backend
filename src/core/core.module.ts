import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { AdaptersModule } from '@infrastructure/adapters/adapters.module'
import { PersistenceModule } from '@infrastructure/persistance/persistence.module'
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
        PersistenceModule,
        AdaptersModule,
        ...featureModules,
    ],
    exports: [CqrsModule, AdaptersModule],
})
export class CoreModule {}
