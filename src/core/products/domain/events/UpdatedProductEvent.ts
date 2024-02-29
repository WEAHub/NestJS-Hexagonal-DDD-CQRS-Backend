import { Product } from '../interfaces/Product'

export class UpdatedProductEvent {
    constructor(
        public readonly product: Product,
        public readonly updatedProduct: Product,
    ) {}
}
