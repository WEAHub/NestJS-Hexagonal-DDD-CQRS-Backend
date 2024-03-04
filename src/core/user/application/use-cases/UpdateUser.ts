import { PasswordService } from '@core/shared/domain/services/PasswordService'
import { UserFactory } from '@core/user/domain/UserFactory'
import { UserRepository } from '@core/user/domain/ports/outbound/repositories/UserRepository'
import { USER_REPOSITORY } from '@core/user/shared/dependency-tokens/repositories'
import { Injectable, Inject, HttpStatus } from '@nestjs/common'
import { User } from '@core/user/domain/interfaces/User'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { EditUserDto } from '@core/user/shared/dto/EditUser.dto'
import { ValidationException } from '@core/shared/exception/ValidationException'

@Injectable()
export class UpdateUserUseCases {
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository

    @Inject()
    private readonly passwordService: PasswordService

    @Inject()
    private readonly userFactory: UserFactory

    async update(
        id: number,
        userProps: EditUserDto,
    ): Promise<AppResponse<User>> {
        const existingUser = await this.repository.findById(id)

        if (!existingUser) {
            throw new ValidationException("User doesn't exists")
        }

        const user = this.userFactory.create({ ...existingUser, ...userProps })

        if (userProps.password) {
            const newPasswordEncrypted = await this.passwordService.encrypt(
                userProps.password,
            )

            user.changePassword(newPasswordEncrypted)
        }

        const data: User = await this.repository.save(user.toPrimitives())
        const response: AppResponse<User> = {
            message: 'User updated successfully',
            status: HttpStatus.OK,
            data,
        }

        user.updated()
        user.commit()

        return response
    }
}
