import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './products/product.module'
import { CartsModule } from './carts/carts.module'

const featureModules = [
    AuthModule, //
    UserModule,
    CategoryModule,
    ProductModule,
    CartsModule,
]

@Module({
    imports: [
        JwtModule.register({ global: true }),
        CqrsModule,
        ...featureModules,
    ],
})
export class CoreModule {}
