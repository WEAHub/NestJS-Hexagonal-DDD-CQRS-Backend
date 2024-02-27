import { Paginated } from '@core/products/domain/interfaces/Paginated'
import { Product } from '@core/products/domain/interfaces/Product'

export interface ProductServicePort {
    find(): Promise<Product[]>
    findByName(name: string): Promise<Product>
    findById(id: number): Promise<Product>
    save(category: Product): Promise<Product>
    paginatedQuery(
        page: number,
        limit: number,
        whereConditions: object,
    ): Promise<Paginated<Product>>
}
