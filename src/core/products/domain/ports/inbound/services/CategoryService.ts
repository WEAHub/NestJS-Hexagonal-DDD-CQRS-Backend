import { Category } from '@core/category/domain/interfaces/Category'

export interface CategoryServicePort {
    findAll(): Promise<Category[]>
    findByName(name: string): Promise<Category>
    findById(id: number): Promise<Category>
}
