import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindManyOptions } from 'typeorm'
import { ProductEntity } from './entities/Product.entity'
import { Product } from '@core/products/domain/interfaces/Product'
import { ProductRepository } from '@core/products/domain/ports/outbound/repositories/ProductRepository'
import { PaginatedValues } from '@core/products/domain/interfaces/Paginated'
import { ProductSorts } from '@core/products/shared/enums/ProductSorts'

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

    async save(product: Partial<Product>): Promise<Product> {
        return this.repository.save(product)
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.repository.delete({ id })
        return deleted.affected > 0
    }

    async paginatedQuery(
        page: number,
        limit: number,
        sort: ProductSorts,
        whereConditions: object,
    ): Promise<PaginatedValues<Product>> {
        const query = this.repository
            .createQueryBuilder('products')
            .where(whereConditions)

        const count: number = await query.getCount()

        const data: Product[] = await query
            .skip(page - 1)
            .take(limit)
            .orderBy('products.id', sort)
            .getMany()

        const result: PaginatedValues<Product> = {
            data,
            count,
        }
        return result
    }
}
