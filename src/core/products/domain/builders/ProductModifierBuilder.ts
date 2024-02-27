import { Product } from '../interfaces/Product'
import { ProductModifier } from '../interfaces/ProductModifier'

export class ProductModifierBuilder {
    modifiers: ProductModifier = this.product.modifiers
    constructor(private product: Partial<Product>) {}

    build(): ProductModifier {
        const modifierAction = {
            discountPercent: (percent: number) =>
                this.applyDiscountPercent(percent),
        }

        Object.entries(this.modifiers).forEach(([k, v]) => {
            modifierAction[k](v)
        })

        return this.modifiers
    }

    private applyDiscountPercent(percent: number): void {
        const { price } = this.product
        this.modifiers.discountPrice = Math.round(
            price - price * (percent / 100),
        )
    }
}
