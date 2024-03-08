import { Cart } from '@core/carts/domain/Cart'
import { CartFactory } from '@core/carts/domain/CartFactory'
import { Cart as ICart } from '@core/carts/domain/interfaces/Cart'
import { CartProduct } from '@core/carts/domain/interfaces/CartProduct'
import { CartsRepository } from '@core/carts/domain/ports/outbound/repositories/CartsRepository'
import { CARTS_REPOSITORY } from '@core/carts/shared/dependency-tokens/repositories'
import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class UpdateCartUseCases {
    @Inject(CARTS_REPOSITORY)
    private readonly repository: CartsRepository

    @Inject()
    private readonly cartFactory: CartFactory

    async update(id: number, products: CartProduct[]): Promise<ICart> {
        const _cart = await this.repository.findById(id)
        const cart: Cart = this.cartFactory.create(_cart)
        cart.updated(products)
        const response = await this.repository.save(cart.toPrimitives())
        return {
            ...response,
            products: await this.repository.aggregateProducts(products),
        }
    }
}
