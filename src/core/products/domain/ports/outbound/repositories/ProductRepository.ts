import { Product } from '@core/products/domain/interfaces/Product'
import { ProductEntity } from '@core/products/infrastructure/adapters/secondary/db/entities/Product.entity'
import { FindManyOptions } from 'typeorm'

export interface ProductRepository {
    find(options: FindManyOptions<ProductEntity>): Promise<Product[]>
    findByName(name: string): Promise<Product>
    findById(id: number): Promise<Product>
    findAll(): Promise<Product[]>
    save(product: Product): Promise<Product>
    delete(id: number): Promise<boolean>
}
