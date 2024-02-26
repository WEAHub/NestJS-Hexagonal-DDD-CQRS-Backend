import { Category } from '@core/category/domain/interfaces/Category'
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
    category: Category
    price: number
    published?: boolean
}
