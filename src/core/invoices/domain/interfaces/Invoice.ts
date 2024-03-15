import { Product } from './Product'
import { UserLocation } from './UserLocation'

export interface Invoice {
    id?: number
    userId: number
    products: Product[]
    amount?: number
    shipping: UserLocation
    date: Date
}
