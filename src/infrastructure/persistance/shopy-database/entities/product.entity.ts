import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ProductModifier } from '../types/product-modifiers.type';

@Entity({ name: 'products'})
export class ProductEntity {
    
    @PrimaryGeneratedColumn({name: 'product_id'})
    id: number;

    @Column({ name: 'product_name'})
    name: string;

    @Column({ name: 'product_image'})
    image: string;

    @Column({ name: 'product_description'})
    description: string;

    @Column({ name: 'product_stock'})
    stock: number;

    @Column({ name: 'product_stock_total'})
    stockTotal: number;

    @Column({ name: 'product_modifiers', nullable: true, type: 'json'})
    modifiers: ProductModifier;

    @Column({ name: '_added_dt'})
    productAddedDate: Date;

    @Column({ name: '_update_dt'})
    productUpdateDate: Date;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: "category_id" })
    category: CategoryEntity;
    
}