import { CategoryBuilder } from '@core/category/domain/builders/CategoryBuilder'
import { Category } from '@core/category/domain/interfaces/Category'
import { CategoryService } from '@core/category/domain/services/CategoryService'
import { CreateCategoryDto } from '@core/category/shared/dto/CreateCategory.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CategoryUseCases {
    constructor(private categoryService: CategoryService) {}

    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll()
    }

    async findByName(name: string): Promise<Category> {
        return this.categoryService.findByName(name)
    }

    async findById(id: number): Promise<Category> {
        return this.categoryService.findById(id)
    }

    async create(category: CreateCategoryDto): Promise<Category> {
        const newCategory = this.buildCategory(category)
        return this.categoryService.save(newCategory)
    }

    private buildCategory(category: CreateCategoryDto): Category {
        return new CategoryBuilder(category)
            .name(category.name)
            .description(category.description)
            .build()
    }
}
