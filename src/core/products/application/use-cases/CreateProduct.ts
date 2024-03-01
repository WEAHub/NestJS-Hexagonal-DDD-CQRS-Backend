import { CategoryRepository } from '@core/category/domain/ports/outbound/repositories/CategoryRepository'
import { ProductFactory } from '@core/products/domain/ProductFactory'
import { Category } from '@core/products/domain/interfaces/Category'
import { Product as IProduct } from '@core/products/domain/interfaces/Product'
import { ProductRepository } from '@core/products/domain/ports/outbound/repositories/ProductRepository'
import {
    CATEGORY_REPOSITORY,
    PRODUCT_REPOSITORY,
} from '@core/products/shared/dependency-tokens/repositories'
import { CreateProductDto } from '@core/products/shared/dto/CreateProduct.dto'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { Injectable, Inject, HttpStatus } from '@nestjs/common'
@Injectable()
export class CreateProductUseCases {
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepository

    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository

    @Inject()
    private readonly productFactory: ProductFactory

    async create(
        productProps: CreateProductDto,
    ): Promise<AppResponse<IProduct>> {
        const productExists = await this.repository.findByName(
            productProps.name,
        )

        if (productExists) {
            throw new ValidationException(
                `Product(name=${productProps.name}) already exists`,
            )
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
            categoryId: category.id,
            productAddedDate: dateNow,
            productUpdateDate: dateNow,
        })

        const savedProduct: IProduct = await this.repository.save(
            product.toPrimitives(),
        )

        const response: AppResponse<IProduct> = {
            status: HttpStatus.OK,
            message: 'Product created successfully',
            data: savedProduct,
        }

        product.created()
        product.commit()
        return response
    }
}
