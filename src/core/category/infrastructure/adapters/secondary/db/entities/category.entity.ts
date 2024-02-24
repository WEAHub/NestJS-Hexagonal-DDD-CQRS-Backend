import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn({ name: 'category_id' })
    id: number

    @Column({ name: 'category_name' })
    name: string

    @Column({ name: 'category_description' })
    description: string
}
