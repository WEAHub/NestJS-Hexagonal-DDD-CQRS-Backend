import { CartProduct } from '@core/carts/domain/interfaces/CartProduct'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'carts' })
export class CartEntity {
    @PrimaryGeneratedColumn({ name: 'cart_id' })
    id: number

    @Column({ name: 'cart_user_id' })
    userId: number

    @Column({ name: 'cart_products', type: 'json' })
    products: CartProduct[]

    @Column({ name: 'cart_updated_dt' })
    updatedDate: Date

    @Column({ name: 'cart_created_dt' })
    addedDate: Date
}
