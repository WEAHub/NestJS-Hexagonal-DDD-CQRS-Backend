import { Product } from '@core/products/domain/interfaces/Product'

export interface ProductServicePort {
    find(): Promise<Product[]>
    findAll(): Promise<Product[]>
    findByName(name: string): Promise<Product>
    findById(id: number): Promise<Product>
    save(category: Product): Promise<Product>
}
