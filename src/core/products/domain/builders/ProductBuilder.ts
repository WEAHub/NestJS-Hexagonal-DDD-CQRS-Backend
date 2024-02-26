import { Product } from '../interfaces/Product'
import { Name } from '../vo/Name'
import { Image } from '../vo/Image'
import { Number } from '../vo/Number'
import { DateVo } from '../vo/Date'
import { Category } from '@core/category/domain/interfaces/Category'

export class ProductBuilder {
    constructor(
        private product: Partial<Product>,
        private strict: boolean = true,
    ) {}

    name(name: string): ProductBuilder {
        if (!this.strict && !name) return this
        this.product.name = new Name(name).getValue()
        return this
    }

    description(description: string): ProductBuilder {
        if (!this.strict && !description) return this
        this.product.description = new Name(description).getValue()
        return this
    }

    image(image: string): ProductBuilder {
        if (!this.strict && !image) return this
        this.product.image = new Image(image).getValue()
        return this
    }

    stock(stock: number): ProductBuilder {
        if (!this.strict && !stock) return this
        this.product.stock = new Number(stock).getValue()
        return this
    }

    stockTotal(stock: number): ProductBuilder {
        if (!this.strict && !stock) return this
        this.product.stock = new Number(stock).getValue()
        return this
    }

    price(price: number): ProductBuilder {
        if (!this.strict && !price) return this
        this.product.price = new Number(price).getValue()
        return this
    }

    updatedDate(date: Date): ProductBuilder {
        if (!this.strict && !date) return this
        this.product.productUpdateDate = new DateVo(date).getValue()
        return this
    }

    addedDate(date: Date): ProductBuilder {
        if (!this.strict && !date) return this
        this.product.productAddedDate = new DateVo(date).getValue()
        return this
    }

    category(category: Category): ProductBuilder {
        if (!this.strict && !category) return this
        this.product.category = category
        return this
    }

    build(): Product {
        return {
            name: this.product.name,
            description: this.product.description,
            image: this.product.image,
            stock: this.product.stock,
            stockTotal: this.product.stockTotal,
            price: this.product.price,
            productUpdateDate: new Date(),
            productAddedDate: this.product.productAddedDate,
            category: this.product.category,
        }
    }
}
