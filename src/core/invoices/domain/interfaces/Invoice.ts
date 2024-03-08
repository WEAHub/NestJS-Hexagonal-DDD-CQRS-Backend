import { Product } from './Product'

export interface Invoice {
    id?: number
    userId: number
    products: Product[]
    amount?: number
    address: string
    date: Date
}
