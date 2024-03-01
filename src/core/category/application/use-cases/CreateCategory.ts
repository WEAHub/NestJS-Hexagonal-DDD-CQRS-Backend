import { CategoryFactory } from '@core/category/domain/CategoryFactory'
import { Category } from '@core/category/domain/interfaces/Category'
import { CategoryRepository } from '@core/category/domain/ports/outbound/repositories/CategoryRepository'
import { CATEGORY_REPOSITORY } from '@core/category/shared/dependency-tokens/repositories'
import { CreateCategoryDto } from '@core/category/shared/dto/CreateCategory.dto'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { HttpStatus, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateCategoryUseCase {
    @Inject(CATEGORY_REPOSITORY) private readonly repository: CategoryRepository
    @Inject() private readonly categoryFactory: CategoryFactory

    async create(
        categoryProperties: CreateCategoryDto,
    ): Promise<AppResponse<Category>> {
        const { name } = categoryProperties
        const categoryExists = await this.repository.findByName(name)

        if (categoryExists) {
            throw new ValidationException(
                `Category already exists(name=${name})`,
            )
        }

        const category = this.categoryFactory.create(categoryProperties)

        const data: Category = await this.repository.save(
            category.toPrimitives(),
        )
        const response: AppResponse<Category> = {
            status: HttpStatus.OK,
            message: 'Category created successfully',
            data,
        }

        category.created()
        category.commit()

        return response
    }
}
