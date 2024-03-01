import { ProductRepository } from '@core/products/domain/ports/outbound/repositories/ProductRepository'
import { PRODUCT_REPOSITORY } from '@core/products/shared/dependency-tokens/repositories'
import { EntityNotFoundException } from '@core/shared/exception/EntityNotFoundException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { Injectable, Inject, HttpStatus } from '@nestjs/common'

@Injectable()
export class DeleteProductUseCases {
    @Inject(PRODUCT_REPOSITORY) private readonly repository: ProductRepository
    async delete(id: number): Promise<AppResponse<null>> {
        const deleted: boolean = await this.repository.delete(id)

        if (!deleted) {
            throw new EntityNotFoundException(
                `Product(id=${id}) doesn't exists`,
            )
        }

        const response: AppResponse<null> = {
            status: HttpStatus.OK,
            message: `Product(id=${id}) deleted successfully!.`,
        }

        return response
    }
}
