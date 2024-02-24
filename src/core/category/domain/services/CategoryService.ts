import { CATEGORY_REPOSITORY } from '@core/category/shared/dependency-tokens/repositories'
import { Category } from '../interfaces/Category'
import { CategoryServicePort } from '../ports/inbound/services/CategoryService'
import { CategoryRepository } from '../ports/outbound/repositories/CategoryRepository'
import { ValidationException } from '@core/shared/exception/ValidationException'

export class CategoryService implements CategoryServicePort {
    constructor(private readonly category: CategoryRepository) {}

    async findAll(): Promise<Category[]> {
        return this.category.findAll()
    }

    async findByName(name: string): Promise<Category> {
        const category: Category = await this.category.findByName(name)
        if (!category) {
            throw new ValidationException(`Invalid Category(name=${name})`)
        }
        return category
    }

    async findById(id: number): Promise<Category> {
        const category: Category = await this.category.findById(id)
        if (!category) {
            throw new ValidationException(`Invalid Category(id=${id})`)
        }
        return category
    }

    async save(category: Category): Promise<Category> {
        return this.category.save(category)
    }
}

export const CategoryServiceProvider = {
    provide: CategoryService,
    inject: [CATEGORY_REPOSITORY],
    useFactory: (categoryRepository: CategoryRepository) =>
        new CategoryService(categoryRepository),
}
