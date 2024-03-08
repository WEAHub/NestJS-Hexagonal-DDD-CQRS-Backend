import { Product } from './Product'

export interface CartProduct {
    productId: number
    quantity: number
    product?: Product
}
