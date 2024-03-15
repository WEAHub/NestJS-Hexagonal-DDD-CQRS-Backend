import { Cart } from '../../../interfaces/Cart'

export interface CartsRepository {
    findByUserId(userId: number): Promise<Cart>
    emptyCartByUserId(userId: number): Promise<void>
}
