import { Category } from '@core/category/domain/interfaces/Category'

export interface CategoryRepository {
    findByName(name: string): Promise<Category>
    findById(id: number): Promise<Category>
    findAll(): Promise<Category[]>
    save(category: Category): Promise<Category>
}
