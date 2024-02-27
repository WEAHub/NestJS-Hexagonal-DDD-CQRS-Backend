import { Paginated, PaginatedValues } from '../interfaces/Paginated'
import { Product } from '../interfaces/Product'
import { ProductServicePort } from '../ports/inbound/services/ProductService'
import { ProductRepository } from '../ports/outbound/repositories/ProductRepository'
import { PRODUCT_REPOSITORY } from '@core/products/shared/dependency-tokens/repositories'

export class ProductService implements ProductServicePort {
    constructor(private readonly product: ProductRepository) {}

    async find(): Promise<Product[]> {
        return this.product.find({ relations: ['category'] })
    }

    async findByName(name: string): Promise<Product> {
        return await this.product.findByName(name)
    }

    async findById(id: number): Promise<Product> {
        return await this.product.findById(id)
    }

    async save(product: Product): Promise<Product> {
        return await this.product.save(product)
    }

    async delete(id: number): Promise<boolean> {
        return await this.product.delete(id)
    }

    async paginatedQuery(
        page: number,
        size: number,
        whereConditions: object,
    ): Promise<Paginated<Product>> {
        const { data, count }: PaginatedValues<Product> =
            await this.product.paginatedQuery(page, size, whereConditions)

        const paginated: Paginated<Product> = {
            page,
            size,
            data,
            count,
        }

        return paginated
    }
}

export const ProductServiceProvider = {
    provide: ProductService,
    inject: [PRODUCT_REPOSITORY],
    useFactory: (productRepository: ProductRepository) =>
        new ProductService(productRepository),
}
