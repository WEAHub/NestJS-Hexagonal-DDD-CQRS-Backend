import { CATEGORY_REPOSITORY } from '@core/products/shared/dependency-tokens/repositories'
import { Category } from '../interfaces/Category'
import { CategoryServicePort } from '../ports/inbound/services/CategoryService'
import { CategoryRepository } from '../ports/outbound/repositories/CategoryRepository'

export class CategoryService implements CategoryServicePort {
    constructor(private readonly category: CategoryRepository) {}

    async findAll(): Promise<Category[]> {
        return this.category.findAll()
    }

    async findByName(name: string): Promise<Category> {
        return await this.category.findByName(name)
    }

    async findById(id: number): Promise<Category> {
        return await this.category.findById(id)
    }
}

export const CategoryServiceProvider = {
    provide: CategoryService,
    inject: [CATEGORY_REPOSITORY],
    useFactory: (categoryRepository: CategoryRepository) =>
        new CategoryService(categoryRepository),
}
