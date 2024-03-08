import { ProductModifier } from './ProductModifier'

export interface Product {
    id?: number
    name: string
    image: string
    description: string
    stock: number
    stockTotal: number
    modifiers?: ProductModifier
    addedDate: Date
    updateDate: Date
    categoryId: number
    price: number
    stars: number
    published?: boolean
    visits: number
    quantity?: number
}
