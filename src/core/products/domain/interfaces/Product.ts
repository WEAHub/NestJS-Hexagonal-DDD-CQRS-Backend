import { ProductModifier } from './ProductModifier'

export interface Product {
    id?: number
    name: string
    image: string
    description: string
    stock: number
    stockTotal: number
    modifiers?: ProductModifier
    productAddedDate: Date
    productUpdateDate: Date
    categoryId: number
    price: number
    published?: boolean
}
