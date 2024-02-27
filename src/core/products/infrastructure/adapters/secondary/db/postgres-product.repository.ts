import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindManyOptions } from 'typeorm'
import { ProductEntity } from './entities/Product.entity'
import { Product } from '@core/products/domain/interfaces/Product'
import { ProductRepository } from '@core/products/domain/ports/outbound/repositories/ProductRepository'
import { PaginatedValues } from '@core/products/domain/interfaces/Paginated'

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

    async save(product: Product): Promise<Product> {
        return this.repository.save(product)
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.repository.delete({ id })
        return deleted.affected > 0
    }

    async paginatedQuery(
        page: number,
        limit: number,
        whereConditions: object,
    ): Promise<PaginatedValues<Product>> {
        const data: Product[] = await this.repository
            .createQueryBuilder('products')
            .where(whereConditions)
            .take(limit)
            .skip(page - 1)
            .getMany()

        const count: number = await this.repository
            .createQueryBuilder('products')
            .where(whereConditions)
            .getCount()

        const result: PaginatedValues<Product> = {
            data,
            count,
        }
        return result
    }
}
