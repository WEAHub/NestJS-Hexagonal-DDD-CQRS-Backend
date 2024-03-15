import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CartsRepository } from '@core/invoices/domain/ports/outbound/repositories/CartsRepository'
import { PRODUCT_REPOSITORY } from '@core/Invoices/shared/dependency-tokens/repositories'
import { Cart } from '@core/invoices/domain/interfaces/Cart'
import { ProductRepository } from '@core/invoices/domain/ports/outbound/repositories/ProductRepository'
import { CartEntity } from './entities/cart.entity'

@Injectable()
export class PostgresCartsRepository implements CartsRepository {
    constructor(
        @InjectRepository(CartEntity)
        private repository: Repository<CartEntity>,

        @Inject(PRODUCT_REPOSITORY)
        private productRepository: ProductRepository,
    ) {}

    async findByUserId(userId: number): Promise<Cart> {
        return this.repository.findOneBy({ userId })
    }

    async emptyCartByUserId(userId: number): Promise<void> {
        const cart = await this.findByUserId(userId)
        cart.products = []
        this.repository.save(cart)
        return
    }
}
