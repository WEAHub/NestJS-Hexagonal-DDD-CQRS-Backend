import { DomainEvent } from '@core/shared/ddd/DomainEvent'
import { CartProperties } from '../Cart'

export class CreatedCartEvent extends DomainEvent<CartProperties> {
    EVENT_NAME = 'shopy.cart.created'

    constructor(public readonly cart: CartProperties) {
        super(cart)
    }
}
