import { CartProduct } from './CartProduct'

export interface Cart {
    id?: number
    userId: number
    products: CartProduct[]
    updatedDate: Date
    addedDate: Date
}
