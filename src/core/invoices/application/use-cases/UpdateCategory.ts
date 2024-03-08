import { CategoryFactory } from '@core/category/domain/CategoryFactory'
import { Category } from '@core/category/domain/interfaces/Category'
import { CategoryRepository } from '@core/category/domain/ports/outbound/repositories/CategoryRepository'
import { CATEGORY_REPOSITORY } from '@core/category/shared/dependency-tokens/repositories'
import { UpdateCategoryDto } from '@core/category/shared/dto/UpdateCategory.dto'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { HttpStatus, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateCategoryUseCase {
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepository

    @Inject()
    private readonly categoryFactory: CategoryFactory

    async update(
        id: number,
        category: UpdateCategoryDto,
    ): Promise<AppResponse<Category>> {
        const categoryExists = await this.repository.findById(id)

        if (!categoryExists) {
            throw new ValidationException(`Invalid Category(id=${id})`)
        }

        const _category = this.categoryFactory.create({
            id: categoryExists.id,
            ...category,
        })

        const data: Category = await this.repository.save(
            _category.toPrimitives(),
        )

        const response: AppResponse<Category> = {
            message: 'Category updated successfully',
            status: HttpStatus.OK,
            data,
        }

        _category.updated()
        _category.commit()
        return response
    }
}
