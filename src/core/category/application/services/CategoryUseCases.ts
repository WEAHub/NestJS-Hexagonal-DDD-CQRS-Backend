import { CategoryBuilder } from '@core/category/domain/builders/CategoryBuilder'
import { Category } from '@core/category/domain/interfaces/Category'
import { CategoryService } from '@core/category/domain/services/CategoryService'
import { CreateCategoryDto } from '@core/category/shared/dto/CreateCategory.dto'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class CategoryUseCases {
    constructor(private categoryService: CategoryService) {}

    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll()
    }

    async findByName(name: string): Promise<Category> {
        const category: Category = await this.categoryService.findByName(name)
        if (!category) {
            throw new ValidationException(`Invalid Category(name=${name})`)
        }
        return category
    }

    async findById(id: number): Promise<Category> {
        const category: Category = await this.categoryService.findById(id)
        if (!category) {
            throw new ValidationException(`Invalid Category(id=${id})`)
        }
        return category
    }

    async create(category: CreateCategoryDto): Promise<Category> {
        const categoryExists = await this.categoryService.findByName(
            category.name,
        )
        if (!!categoryExists) {
            throw new ValidationException(
                `Category already exists(name=${category.name})`,
            )
        }
        const newCategory = this.buildCategory(category)
        return this.categoryService.save(newCategory)
    }

    async delete(id: number): Promise<AppResponse<null>> {
        await this.categoryService.delete(id)

        const response: AppResponse<null> = {
            status: HttpStatus.OK,
            message: `Category(id=${id}) Deleted successfully`,
            data: null,
        }

        return response
    }

    private buildCategory(category: CreateCategoryDto): Category {
        return new CategoryBuilder(category)
            .name(category.name)
            .description(category.description)
            .build()
    }
}
