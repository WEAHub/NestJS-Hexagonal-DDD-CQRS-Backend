import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'categories' })
export class CategoryEntity {

    @PrimaryGeneratedColumn({ name: 'category_id' })
    id: number;

    @Column({ name: 'category_name' })
    name: string;

    @Column({ name: 'category_description' })
    description: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    @JoinColumn({ name: "category_id" })
    products: ProductEntity[]
    
}