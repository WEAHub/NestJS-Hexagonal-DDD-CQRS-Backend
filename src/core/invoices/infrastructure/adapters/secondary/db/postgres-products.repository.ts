import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductEntity } from './entities/Product.entity'
import { ProductRepository } from '@core/invoices/domain/ports/outbound/repositories/ProductRepository'
import { Product } from '@core/invoices/domain/interfaces/Product'

@Injectable()
export class PostgresProductRepository implements ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private repository: Repository<ProductEntity>,
    ) {}

    async findByArrayIds(ids: number[]): Promise<Product[]> {
        return this.repository
            .createQueryBuilder('products')
            .where('product_id IN (:...ids)', { ids })
            .getMany()
    }

    async findById(id: number): Promise<Product> {
        return this.repository.findOneBy({ id })
    }

    async updateStock(id: number, stock: number): Promise<Product> {
        const product = await this.findById(id)
        product.stock = product.stock - stock
        return this.repository.save(product)
    }
}
