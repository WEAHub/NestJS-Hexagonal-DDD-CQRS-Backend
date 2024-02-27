import { Paginated } from '@core/products/domain/interfaces/Paginated'
import { Product } from '@core/products/domain/interfaces/Product'
import { ProductSorts } from '@core/products/shared/enums/ProductSorts'

export interface ProductServicePort {
    find(): Promise<Product[]>
    findByName(name: string): Promise<Product>
    findById(id: number): Promise<Product>
    save(category: Product): Promise<Product>
    paginatedQuery(
        page: number,
        limit: number,
        sort: ProductSorts,
        whereConditions: object,
    ): Promise<Paginated<Product>>
}
