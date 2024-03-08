import { Product } from '@core/products/domain/interfaces/Product'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'invoices' })
export class InvoiceEntity {
    @PrimaryGeneratedColumn({ name: 'invoices_id' })
    id: number

    @Column({ name: 'invoice_user_id' })
    userId: number

    @Column({ name: 'invoice_products', type: 'json' })
    products: Product[]

    @Column({ name: 'invoice_amount' })
    amount: number

    @Column({ name: 'invoice_date' })
    date: Date

    @Column({ name: 'invoice_address' })
    address: string
}
