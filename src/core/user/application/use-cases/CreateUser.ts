import { PasswordService } from '@core/shared/domain/services/PasswordService'
import { ValidationException } from '@core/shared/exception/ValidationException'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { UserFactory } from '@core/user/domain/UserFactory'
import { User } from '@core/user/domain/interfaces/User'
import { UserRepository } from '@core/user/domain/ports/outbound/repositories/UserRepository'
import { USER_REPOSITORY } from '@core/user/shared/dependency-tokens/repositories'
import { CreateUserDto } from '@core/user/shared/dto/CreateUser.dto'
import { Injectable, Inject, HttpStatus } from '@nestjs/common'

@Injectable()
export class CreateUserUseCases {
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository

    @Inject()
    private readonly passwordService: PasswordService

    @Inject()
    private readonly userFactory: UserFactory

    async create(userProps: CreateUserDto): Promise<AppResponse<User>> {
        const userExists: User = await this.repository.findByEmail(
            userProps.email,
        )

        if (userExists) {
            throw new ValidationException('Email already exists')
        }

        const user = this.userFactory.create(userProps)

        const encryptedPassword = await this.passwordService.encrypt(
            user.user.password.getValue(),
        )

        const userEntity: User = await this.repository.create({
            ...user.toPrimitives(),
            password: encryptedPassword,
        })

        this.repository.save(userEntity)

        const response: AppResponse<null> = {
            status: HttpStatus.OK,
            message: 'User created successfully',
        }

        user.created()
        user.commit()

        return response
    }
}
