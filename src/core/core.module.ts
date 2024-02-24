import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module'

const featureModules = [
    AuthModule, //
    UserModule,
    CategoryModule,
]

@Module({
    imports: [
        JwtModule.register({ global: true }),
        CqrsModule,
        ...featureModules,
    ],
})
export class CoreModule {}
