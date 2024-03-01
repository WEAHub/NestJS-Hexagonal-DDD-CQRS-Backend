import { CategoryRepository } from '@core/category/domain/ports/outbound/repositories/CategoryRepository'
import { CATEGORY_REPOSITORY } from '@core/products/shared/dependency-tokens/repositories'
import { Product as IProduct } from '@core/products/domain/interfaces/Product'
import { ProductRepository } from '@core/products/domain/ports/outbound/repositories/ProductRepository'
import { PRODUCT_REPOSITORY } from '@core/products/shared/dependency-tokens/repositories'
import { UpdateProductDto } from '@core/products/shared/dto/UpdateProduct.dto'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { Injectable, Inject, HttpStatus } from '@nestjs/common'
import { Category } from '@core/products/domain/interfaces/Category'
import { ProductFactory } from '@core/products/domain/ProductFactory'

@Injectable()
export class UpdateProductUseCases {
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepository

    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository

    @Inject()
    private readonly productFactory: ProductFactory

    async update(
        id: number,
        productProps: UpdateProductDto,
    ): Promise<AppResponse<IProduct>> {
        const beforeProduct = await this.repository.findById(id)

        if (!beforeProduct) {
            throw new ValidationException(`Invalid Product(id=${id})`)
        }

        const category: Category = await this.categoryRepository.findById(
            productProps.categoryId,
        )

        if (!category) {
            throw new ValidationException(
                `Category(id=${productProps.categoryId}) doesn't exists`,
            )
        }

        const dateNow = new Date()

        const product = this.productFactory.create({
            ...productProps,
            id,
            categoryId: category.id,
            productAddedDate: beforeProduct.productAddedDate,
            productUpdateDate: dateNow,
        })

        const data: IProduct = await this.repository.save(
            product.toPrimitives(),
        )

        const response: AppResponse<IProduct> = {
            message: 'Product updated successfully',
            status: HttpStatus.OK,
            data,
        }

        product.updated()
        product.commit()

        return response
    }
}
