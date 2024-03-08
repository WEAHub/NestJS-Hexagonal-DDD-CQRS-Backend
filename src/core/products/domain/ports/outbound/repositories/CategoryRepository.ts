import { Category } from '@core/products/domain/interfaces/Category'

export interface CategoryRepository {
    findById(id: number): Promise<Category>
}
