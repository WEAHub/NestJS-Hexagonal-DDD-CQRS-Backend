import { ProductModifier } from '@core/carts/domain/interfaces/ProductModifier'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn({ name: 'product_id' })
    id: number

    @Column({ name: 'product_name' })
    name: string

    @Column({ name: 'product_image' })
    image: string

    @Column({ name: 'product_description' })
    description: string

    @Column({ name: 'product_stock' })
    stock: number

    @Column({ name: 'product_stock_total' })
    stockTotal: number

    @Column({ name: 'product_price' })
    price: number

    @Column({ name: 'product_added_dt' })
    addedDate: Date

    @Column({ name: 'product_update_dt' })
    updateDate: Date

    @Column({ name: 'product_category_id' })
    categoryId: number

    @Column({ name: 'product_modifiers', nullable: true, type: 'json' })
    modifiers: ProductModifier

    @Column({ name: 'product_stars' })
    stars: number

    @Column({ name: 'product_published' })
    published: boolean

    @Column({ name: 'product_visits' })
    visits: number
}
