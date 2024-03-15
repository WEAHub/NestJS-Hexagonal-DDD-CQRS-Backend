import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SaveOptions } from 'typeorm'
import { CartEntity } from './entities/cart.entity'
import { CartsRepository } from '@core/carts/domain/ports/outbound/repositories/CartsRepository'
import { Cart } from '@core/carts/domain/interfaces/Cart'
import { CartProduct } from '@core/carts/domain/interfaces/CartProduct'
import { ProductRepository } from '@core/carts/domain/ports/outbound/repositories/ProductRepository'
import { PRODUCT_REPOSITORY } from '@core/carts/shared/dependency-tokens/repositories'
import { Product } from '@core/carts/domain/interfaces/Product'

@Injectable()
export class PostgresCartsRepository implements CartsRepository {
    constructor(
        @InjectRepository(CartEntity)
        private repository: Repository<CartEntity>,

        @Inject(PRODUCT_REPOSITORY)
        private productRepository: ProductRepository,
    ) {}

    async findById(id: number): Promise<Cart> {
        return this.repository.findOneBy({ id })
    }

    async findByUserId(userId: number): Promise<Cart> {
        return this.repository.findOneBy({ userId })
    }

    async create(cart: Cart): Promise<Cart> {
        return this.repository.create(cart)
    }

    async save(cart: Cart, options?: SaveOptions): Promise<Cart> {
        return this.repository.save(cart, options)
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.repository.delete({ id })
        return deleted.affected > 0
    }

    async aggregateProducts(products: CartProduct[]): Promise<CartProduct[]> {
        if (!products.length) return []

        const productIds: number[] = products.map((p) => p.productId)

        const _products: Product[] =
            await this.productRepository.findByArrayIds(productIds)

        return products.map((p) => ({
            ...p,
            product: _products.find((_p) => _p.id === p.productId),
        }))
    }
}
