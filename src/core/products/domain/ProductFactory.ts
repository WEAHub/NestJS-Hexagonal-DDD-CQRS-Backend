import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { Product, ProductProperties } from './Product.js'
import { Product as IProduct } from './interfaces/Product.js'
import { DateVo } from './vo/Date.js'
import { Name } from './vo/Name.js'
import { NumberVo } from './vo/Number.js'
import { Image } from './vo/Image.js'
import { ModifiersBuilder } from './builders/ModifiersBuilder.js'

export class ProductFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

    create(options: IProduct): Product {
        const modifiers = new ModifiersBuilder(options).build()

        const properties: ProductProperties = {
            ...options, //id
            modifiers,
            name: new Name(options.name),
            image: new Image(options.image),
            description: new Name(options.description),
            stock: new NumberVo(options.stock),
            stockTotal: new NumberVo(options.stockTotal),
            addedDate: new DateVo(options.addedDate),
            updateDate: new DateVo(options.updateDate),
            categoryId: new NumberVo(options.categoryId),
            price: new NumberVo(options.price),
            visits: options.visits,
            published: options.published,
        }

        const product = new Product(properties)
        return this.eventPublisher.mergeObjectContext(product)
    }
}
