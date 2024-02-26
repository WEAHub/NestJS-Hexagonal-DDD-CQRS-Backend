import { Category } from '@core/category/domain/interfaces/Category'
import { ProductBuilder } from '@core/products/domain/builders/ProductBuilder'
import { Product } from '@core/products/domain/interfaces/Product'
import { CategoryService } from '@core/products/domain/services/CategoryService'
import { ProductService } from '@core/products/domain/services/ProductService'
import { CreateProductDto } from '@core/products/shared/dto/CreateProduct.dto'
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
        const existingProduct = await this.productService.findByName(
            product.name,
        )

        if (existingProduct) {
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

    private buildProduct(product: Product, strict: boolean = true): Product {
        return new ProductBuilder(product, strict)
            .name(product.name)
            .description(product.description)
            .category(product.category)
            .image(product.image)
            .price(product.price)
            .stock(product.stock)
            .stockTotal(product.stockTotal)
            .build()
    }
}
