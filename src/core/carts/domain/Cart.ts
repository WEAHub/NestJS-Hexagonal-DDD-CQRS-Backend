import { CartProduct } from './interfaces/CartProduct'
import { AggregateRoot } from '@nestjs/cqrs'
import { Cart as ICart } from './interfaces/Cart'
import { CreatedCartEvent } from './events/CreatedCartEvent'
import { UpdatedCartEvent } from './events/UpdatedCartEvent'
import { DateVo } from './vo/Date'
import { NumberVo } from './vo/Number'

export interface CartProperties {
    id?: number
    userId: NumberVo
    products: CartProduct[]
    updatedDate: DateVo
    addedDate: DateVo
}

export class Cart extends AggregateRoot {
    cart: CartProperties

    constructor(properties: CartProperties) {
        super()
        this.cart = properties
    }

    created(): void {
        this.apply(new CreatedCartEvent(this.cart))
    }

    updated(products: CartProduct[]): void {
        this.cart.products = products
        this.cart.updatedDate = new DateVo(new Date())
        //this.apply(new UpdatedCartEvent(this.cart.id))
    }

    toPrimitives(): ICart {
        return {
            id: this.cart.id,
            userId: this.cart.userId.getValue(),
            products: this.cart.products,
            addedDate: this.cart.addedDate.getValue(),
            updatedDate: this.cart.updatedDate.getValue(),
        }
    }
}
