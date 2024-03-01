import { EntityNotFoundException } from '@core/shared/exception/EntityNotFoundException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { UserRepository } from '@core/user/domain/ports/outbound/repositories/UserRepository'
import { USER_REPOSITORY } from '@core/user/shared/dependency-tokens/repositories'
import { Injectable, Inject, HttpStatus } from '@nestjs/common'

@Injectable()
export class DeleteUserUseCases {
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository

    async delete(id: number): Promise<AppResponse<null>> {
        const deleted: boolean = await this.repository.delete(id)

        if (!deleted) {
            throw new EntityNotFoundException(`User(id=${id}) doesn't exists`)
        }

        const response: AppResponse<null> = {
            message: `User(id=${id}) Deleted succesfully`,
            status: HttpStatus.OK,
        }

        return response
    }
}
