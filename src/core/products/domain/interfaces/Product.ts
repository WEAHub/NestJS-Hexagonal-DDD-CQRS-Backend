import { Category } from '@core/category/domain/interfaces/Category'

export interface Product {
    id?: number
    name: string
    image: string
    description: string
    stock: number
    stockTotal: number
    modifiers?: any
    productAddedDate: Date
    productUpdateDate: Date
    category: Category
    price: number
}
