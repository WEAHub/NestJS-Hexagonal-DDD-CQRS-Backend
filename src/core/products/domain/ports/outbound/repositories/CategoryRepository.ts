import { Category } from '@core/products/domain/interfaces/Category'

export interface CategoryRepository {
    findByName(name: string): Promise<Category>
    findById(id: number): Promise<Category>
    findAll(): Promise<Category[]>
}
