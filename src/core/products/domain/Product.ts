import { AggregateRoot } from '@nestjs/cqrs'
import { ProductModifier } from './interfaces/ProductModifier'
import { DateVo } from './vo/Date'
import { Name } from './vo/Name'
import { Image } from './vo/Image'
import { NumberVo } from './vo/Number'
import { Product as IProduct } from './interfaces/Product'
import { CreatedProductEvent } from './events/CreatedProductEvent'
import { DeletedProductEvent } from './events/DeletedProductEvent'
import { UpdatedProductEvent } from './events/UpdatedProductEvent'

export interface ProductProperties {
    id?: number
    name: Name
    image: Image
    description: Name
    stock: NumberVo
    stockTotal: NumberVo
    modifiers?: ProductModifier
    addedDate?: DateVo
    updateDate?: DateVo
    categoryId: NumberVo
    price: NumberVo
    published: boolean
    visits: number
}

export class Product extends AggregateRoot {
    product: ProductProperties

    constructor(properties: ProductProperties) {
        super()
        this.product = properties
    }

    publish(): void {
        this.product.published = true
    }

    unpublish(): void {
        this.product.published = false
    }

    created(): void {
        this.apply(new CreatedProductEvent(this.product.name.getValue()))
    }

    updated(): void {
        this.apply(new UpdatedProductEvent(this.product.id))
    }

    deleted(): void {
        this.apply(new DeletedProductEvent(this.product.id))
    }

    toPrimitives(): Partial<IProduct> {
        return {
            id: this.product.id,
            name: this.product.name.getValue(),
            image: this.product.image.getValue(),
            description: this.product.description.getValue(),
            stock: this.product.stock.getValue(),
            stockTotal: this.product.stockTotal.getValue(),
            modifiers: this.product.modifiers,
            addedDate: this.product.addedDate.getValue(),
            updateDate: this.product.updateDate.getValue(),
            categoryId: this.product.categoryId.getValue(),
            price: this.product.price.getValue(),
            published: this.product.published,
        }
    }
}
