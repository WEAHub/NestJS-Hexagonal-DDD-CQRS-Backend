import { CartProduct } from '../interfaces/CartProduct'

export class UpdateCartCommand {
    constructor(
        public readonly id: number,
        public readonly products: CartProduct[],
    ) {}
}
