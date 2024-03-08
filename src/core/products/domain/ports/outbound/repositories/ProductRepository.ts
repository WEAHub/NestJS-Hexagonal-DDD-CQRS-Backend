import { PaginatedValues } from '@core/shared/domain/interfaces/Paginated'
import { Product } from '@core/products/domain/interfaces/Product'
import { ProductEntity } from '@core/products/infrastructure/adapters/secondary/db/entities/Product.entity'
import { ProductSorts } from '@core/products/shared/enums/ProductSorts'
import { FindManyOptions } from 'typeorm'

export interface ProductRepository {
    find(options: FindManyOptions<ProductEntity>): Promise<Product[]>
    findByName(name: string): Promise<Product>
    findById(id: number): Promise<Product>
    save(product: Partial<Product>): Promise<Product>
    delete(id: number): Promise<boolean>
    paginatedQuery(
        page: number,
        limit: number,
        sort: ProductSorts,
        sortColumn: string,
        whereConditions: object,
    ): Promise<PaginatedValues<Product>>
}
