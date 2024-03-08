import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { Cart as ICart } from './interfaces/Cart'
import { Cart, CartProperties } from './Cart'
import { NumberVo } from './vo/Number'
import { DateVo } from './vo/Date'

export class CartFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

    create(options: ICart): Cart {
        const properties: CartProperties = {
            ...options,
            products: options.products ?? [],
            userId: new NumberVo(options.userId),
            addedDate: new DateVo(options.addedDate),
            updatedDate: new DateVo(options.updatedDate),
        }

        const _cart = new Cart(properties)
        return this.eventPublisher.mergeObjectContext(_cart)
    }
}
