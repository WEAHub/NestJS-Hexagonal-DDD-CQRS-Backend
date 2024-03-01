import { CategoryFactory } from '@core/category/domain/CategoryFactory'
import { CategoryRepository } from '@core/category/domain/ports/outbound/repositories/CategoryRepository'
import { CATEGORY_REPOSITORY } from '@core/category/shared/dependency-tokens/repositories'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { HttpStatus, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteCategoryUseCase {
    @Inject(CATEGORY_REPOSITORY) private readonly repository: CategoryRepository
    @Inject() private readonly categoryFactory: CategoryFactory

    async delete(id: number): Promise<AppResponse<null>> {
        const category = await this.repository.findById(id)

        if (!category) {
            throw new ValidationException(`Category(id=${id}) doesn't exists`)
        }

        const _category = this.categoryFactory.create(category)

        await this.repository.delete(id)

        _category.delete()
        _category.commit()

        const response: AppResponse<null> = {
            status: HttpStatus.OK,
            message: `Category(id=${id}) Deleted successfully`,
        }
        return response
    }
}
