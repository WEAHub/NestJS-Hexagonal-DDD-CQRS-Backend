import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SaveOptions } from 'typeorm'
import { CartEntity } from './entities/cart.entity'
import { CartsRepository } from '@core/carts/domain/ports/outbound/repositories/CartsRepository'
import { Cart } from '@core/carts/domain/interfaces/Cart'

@Injectable()
export class PostgresCartsRepository implements CartsRepository {
    constructor(
        @InjectRepository(CartEntity)
        private repository: Repository<CartEntity>,
    ) {}

    async findById(id: number): Promise<Cart> {
        return this.repository.findOneBy({ id })
    }

    async create(cart: Cart): Promise<Cart> {
        return this.repository.create(cart)
    }

    async save(cart: Cart, options?: SaveOptions): Promise<Cart> {
        return this.repository.save(cart, options)
    }

    async findByUserId(userId: number): Promise<Cart> {
        return this.repository.findOneBy({ userId })
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.repository.delete({ id })
        return deleted.affected > 0
    }
}
