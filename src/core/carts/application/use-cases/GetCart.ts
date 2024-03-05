import { CartsRepository } from '@core/carts/domain/ports/outbound/repositories/CartsRepository'
import { CARTS_REPOSITORY } from '@core/carts/shared/dependency-tokens/repositories'
import { Injectable, Inject } from '@nestjs/common'
import { Cart as ICart } from '@core/carts/domain/interfaces/Cart'
import { ValidationException } from '@core/shared/exception/ValidationException'
@Injectable()
export class GetCartUseCases {
    @Inject(CARTS_REPOSITORY)
    private readonly repository: CartsRepository

    async getByUserId(userId: number): Promise<ICart> {
        const cart = await this.repository.findByUserId(userId)

        if (!cart) {
            throw new ValidationException(
                `Cart for User(id=${userId}) doesn\'t exists`,
            )
        }

        return cart
    }
}
