import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresCartsRepository } from './secondary/db/postgres-carts.repository'
import { CartEntity } from './secondary/db/entities/cart.entity'
import { CARTS_REPOSITORY } from '@core/carts/shared/dependency-tokens/repositories'
import { GetCartController } from './primary/http/get.controller'

const controllers = [GetCartController]

const providers = [
    PostgresCartsRepository,
    {
        provide: CARTS_REPOSITORY,
        useExisting: PostgresCartsRepository,
    },
]

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([CartEntity])],
    providers: providers,
    controllers,
    exports: providers,
})
export class CartsAdaptersModule {}
