import { Category } from '@core/category/domain/interfaces/Category'
import { CategoryRepository } from '@core/category/domain/ports/outbound/repositories/CategoryRepository'
import { CATEGORY_REPOSITORY } from '@core/category/shared/dependency-tokens/repositories'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetCategoryUseCases {
    @Inject(CATEGORY_REPOSITORY) private readonly repository: CategoryRepository

    async findAll(): Promise<Category[]> {
        return this.repository.findAll()
    }

    async findByName(name: string): Promise<Category> {
        const category: Category = await this.repository.findByName(name)
        if (!category) {
            throw new ValidationException(`Invalid Category(name=${name})`)
        }
        return category
    }

    async findById(id: number): Promise<Category> {
        const category: Category = await this.repository.findById(id)
        if (!category) {
            throw new ValidationException(`Invalid Category(id=${id})`)
        }
        return category
    }
}
