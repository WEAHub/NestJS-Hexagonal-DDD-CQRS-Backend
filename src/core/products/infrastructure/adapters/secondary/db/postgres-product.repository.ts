import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindManyOptions } from 'typeorm'
import { ProductEntity } from './entities/Product.entity'
import { Product } from '@core/products/domain/interfaces/Product'
import { ProductRepository } from '@core/products/domain/ports/outbound/repositories/ProductRepository'

@Injectable()
export class PostgresProductRepository implements ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private repository: Repository<ProductEntity>,
    ) {}

    async find(options: FindManyOptions<ProductEntity>): Promise<Product[]> {
        return this.repository.find(options)
    }

    async findById(id: number): Promise<Product> {
        return this.repository.findOneBy({ id })
    }

    async findByName(name: string): Promise<Product> {
        return this.repository.findOneBy({ name })
    }

    async findAll(): Promise<Product[]> {
        return this.repository.find()
    }

    async save(product: Product): Promise<Product> {
        return this.repository.save(product)
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.repository.delete({ id })
        return deleted.affected > 0
    }
}
