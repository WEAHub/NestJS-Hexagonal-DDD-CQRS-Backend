import { DateVo } from '@core/products/domain/vo/Date'
import { CartProduct } from './interfaces/CartProduct'
import { NumberVo } from '@core/products/domain/vo/Number'
import { AggregateRoot } from '@nestjs/cqrs'
import { Cart as ICart } from './interfaces/Cart'
import { CreatedCartEvent } from './events/CreatedCartEvent'
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

    updated(): void {
        //this.apply(new UpdatedUserEvent(this.user.id))
    }

    deleted(): void {
        //this.apply(new DeletedUserEvent(this.user.id))
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
