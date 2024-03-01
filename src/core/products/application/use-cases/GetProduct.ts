import {
    PaginatedQueryParameters,
    PaginatedQueryBuilder,
} from '@core/products/domain/builders/PaginatedQueryBuilder'
import {
    Paginated,
    PaginatedValues,
} from '@core/products/domain/interfaces/Paginated'
import { ProductRepository } from '@core/products/domain/ports/outbound/repositories/ProductRepository'
import { PRODUCT_REPOSITORY } from '@core/products/shared/dependency-tokens/repositories'
import { GetProductDto } from '@core/products/shared/dto/GetProduct.dto'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { Injectable, Inject } from '@nestjs/common'
import { Product as IProduct } from '@core/products/domain/interfaces/Product'
@Injectable()
export class GetProductUseCases {
    @Inject(PRODUCT_REPOSITORY) private readonly repository: ProductRepository

    async findByName(name: string): Promise<IProduct> {
        const product: IProduct = await this.repository.findByName(name)
        if (!product) {
            throw new ValidationException(`Invalid Product(name=${name})`)
        }
        return product
    }

    async findById(id: number): Promise<IProduct> {
        const product: IProduct = await this.repository.findById(id)
        if (!product) {
            throw new ValidationException(`Invalid Product(id=${id})`)
        }
        return product
    }

    async findAll(query: GetProductDto): Promise<Paginated<IProduct>> {
        const queryParameters: PaginatedQueryParameters =
            new PaginatedQueryBuilder(query).create()

        const { page, limit, sort, whereConditions } = queryParameters

        const { data, count }: PaginatedValues<IProduct> =
            await this.repository.paginatedQuery(
                page,
                limit,
                sort,
                whereConditions,
            )

        const paginatedProducts: Paginated<IProduct> = {
            page,
            limit,
            data,
            count,
        }
        return paginatedProducts
    }
}
