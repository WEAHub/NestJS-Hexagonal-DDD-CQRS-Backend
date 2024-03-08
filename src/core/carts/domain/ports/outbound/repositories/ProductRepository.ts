import { Product } from '@core/carts/domain/interfaces/Product'

export interface ProductRepository {
    findById(id: number): Promise<Product>
}
