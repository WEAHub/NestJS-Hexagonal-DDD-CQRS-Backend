import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductEntity } from './entities/Product.entity'
import { ProductRepository } from '@core/carts/domain/ports/outbound/repositories/ProductRepository'
import { Product } from '@core/carts/domain/interfaces/Product'

@Injectable()
export class PostgresProductRepository implements ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private repository: Repository<ProductEntity>,
    ) {}

    async findById(id: number): Promise<Product> {
        return this.repository.findOneBy({ id })
    }
}
