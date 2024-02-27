import { Category } from '@core/category/domain/interfaces/Category'
import { ProductBuilder } from '@core/products/domain/builders/ProductBuilder'
import { Product } from '@core/products/domain/interfaces/Product'
import { CategoryService } from '@core/products/domain/services/CategoryService'
import { ProductService } from '@core/products/domain/services/ProductService'
import { CreateProductDto } from '@core/products/shared/dto/CreateProduct.dto'
import { UpdateProductDto } from '@core/products/shared/dto/UpdateProduct.dto'
import { EntityNotFoundException } from '@core/shared/exception/EntityNotFoundException'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class ProductUseCases {
    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
    ) {}

    async findByName(name: string): Promise<Product> {
        const product: Product = await this.productService.findByName(name)
        if (!product) {
            throw new ValidationException(`Invalid Product(name=${name})`)
        }
        return product
    }

    async findById(id: number): Promise<Product> {
        const product: Product = await this.productService.findById(id)
        if (!product) {
            throw new ValidationException(`Invalid Product(id=${id})`)
        }
        return product
    }

    async findAll(): Promise<Product[]> {
        return this.productService.find()
    }

    async create(product: CreateProductDto): Promise<AppResponse<Product>> {
        const productExists = await this.productService.findByName(product.name)

        if (productExists) {
            throw new ValidationException(
                `Product(name=${product.name}) already exists`,
            )
        }

        const category: Category = await this.categoryService.findById(
            product.categoryId,
        )

        if (!category) {
            throw new ValidationException(
                `Category(id=${product.categoryId}) doesn't exists`,
            )
        }

        const dateNow = new Date()
        const buildedProduct: Product = this.buildProduct({
            ...product,
            category,
            productAddedDate: dateNow,
            productUpdateDate: dateNow,
        })

        const savedProduct: Product =
            await this.productService.save(buildedProduct)

        const response: AppResponse<Product> = {
            status: HttpStatus.OK,
            message: 'Product created successfully',
            data: savedProduct,
        }

        return response
    }

    async update(
        id: number,
        product: UpdateProductDto,
    ): Promise<AppResponse<Product>> {
        const { id: lastId, productAddedDate } =
            await this.productService.findById(id)

        if (!lastId) {
            throw new ValidationException(`Invalid Product(id=${id})`)
        }

        const category: Category = await this.categoryService.findById(
            product.categoryId,
        )

        if (!category) {
            throw new ValidationException(
                `Category(id=${product.categoryId}) doesn't exists`,
            )
        }

        const dateNow = new Date()
        const validProduct: Product = this.buildProduct(
            {
                ...product,
                category,
                productAddedDate: productAddedDate,
                productUpdateDate: dateNow,
            },
            false,
        )
        validProduct.id = lastId

        const data: Product = await this.productService.save(validProduct)

        const response: AppResponse<Product> = {
            message: 'Product updated successfully',
            status: HttpStatus.OK,
            data,
        }

        return response
    }

    async delete(id: number): Promise<AppResponse<null>> {
        const deleted: boolean = await this.productService.delete(id)

        if (!deleted) {
            throw new EntityNotFoundException(
                `Product(id=${id}) doesn't exists`,
            )
        }

        const response: AppResponse<null> = {
            status: HttpStatus.OK,
            message: `Product(id=${id}) deleted successfully!.`,
        }

        return response
    }

    private buildProduct(product: Product, strict: boolean = true): Product {
        return new ProductBuilder(product, strict)
            .name(product.name)
            .description(product.description)
            .category(product.category)
            .image(product.image)
            .price(product.price)
            .stock(product.stock)
            .stockTotal(product.stockTotal)
            .modifiers(product.modifiers)
            .build()
    }
}
