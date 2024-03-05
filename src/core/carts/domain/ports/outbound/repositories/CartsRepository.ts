import { Cart } from '../../../interfaces/Cart'
import { SaveOptions } from 'typeorm'

export interface CartsRepository {
    findById(id: number): Promise<Cart>
    findByUserId(userId: number): Promise<Cart>
    create(cart: Cart): Promise<Cart>
    save(cart: Cart, options?: SaveOptions): Promise<Cart>
    delete(id: number): Promise<boolean>
}
