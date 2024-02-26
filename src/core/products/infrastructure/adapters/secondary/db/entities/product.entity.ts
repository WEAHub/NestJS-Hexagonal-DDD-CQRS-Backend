import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { CategoryEntity } from './category.entity'
import { ProductModifier } from '@core/products/domain/interfaces/ProductModifier'

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
    productAddedDate: Date

    @Column({ name: 'product_update_dt' })
    productUpdateDate: Date

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'product_category_id' })
    category: CategoryEntity

    @Column({ name: 'product_modifiers', nullable: true, type: 'json' })
    modifiers: ProductModifier
}
