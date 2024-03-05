import { Cart } from '@core/carts/domain/Cart'
import { CartFactory } from '@core/carts/domain/CartFactory'
import { Cart as ICart } from '@core/carts/domain/interfaces/Cart'
import { CartsRepository } from '@core/carts/domain/ports/outbound/repositories/CartsRepository'
import { CARTS_REPOSITORY } from '@core/carts/shared/dependency-tokens/repositories'
import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class CreateCartUseCases {
    @Inject(CARTS_REPOSITORY)
    private readonly repository: CartsRepository

    @Inject()
    private readonly cartFactory: CartFactory

    async create(userId: number): Promise<ICart> {
        const dateNow = new Date()
        const cart: Cart = this.cartFactory.create({
            userId,
            addedDate: dateNow,
            updatedDate: dateNow,
            products: [],
        })

        const cartEntity = await this.repository.save(cart.toPrimitives())
        cart.cart.id = cartEntity.id
        cart.created()
        cart.commit()
        return cartEntity
    }
}
