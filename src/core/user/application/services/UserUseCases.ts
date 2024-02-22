import { PasswordService } from '@core/shared/domain/services/PasswordService'
import { AppResponse } from '@core/shared/infrastructure/model/app.response'
import { UserBuilder } from '@core/user/domain/builders/UserBuilder'
import { User } from '@core/user/domain/interfaces/User'
import { UserService } from '@core/user/domain/services/UserService'
import { Avatar } from '@core/user/domain/vo/Avatar'
import { Email } from '@core/user/domain/vo/Email'
import { Name } from '@core/user/domain/vo/Name'
import { Password } from '@core/user/domain/vo/Password'
import { Phone } from '@core/user/domain/vo/Phone'
import { CreateUserDto } from '@core/user/shared/dto/CreateUser.dto'
import { EditUserDto } from '@core/user/shared/dto/EditUser.dto'
import { UserRoles } from '@core/user/shared/enums/user-roles.enum'
import { HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class UserUseCases {
    constructor(
        private userService: UserService,
        private passwordService: PasswordService,
    ) {}

    async getUser(userId: number): Promise<User> {
        const user: User = await this.userService.getUser(userId)
        delete user.password
        return user
    }

    async create(newUser: CreateUserDto): Promise<AppResponse<User>> {
        await this.userService.checkUser(newUser.email)

        const user: User = this.buildUser(newUser)

        const encryptedPassword = await this.passwordService.encrypt(
            user.password,
        )

        const userEntity: User = await this.userService.create({
            ...user,
            password: encryptedPassword,
        })

        this.userService.save(userEntity)

        const response: AppResponse<User> = {
            status: HttpStatus.OK,
            message: 'User created successfully',
            data: userEntity,
        }

        return response
    }

    async update(user: EditUserDto): Promise<AppResponse<User>> {
        const existingUser = await this.userService.getUser(user.id)
        const _user: User = this.buildUser(user)
        _user.id = existingUser.id

        const data: User = await this.userService.save(_user)
        const response: AppResponse<User> = {
            message: 'User updated successfully',
            status: HttpStatus.OK,
            data,
        }
        return response
    }

    async delete(userId: number): Promise<AppResponse<null>> {
        await this.userService.delete(userId)

        const response: AppResponse<null> = {
            message: `User(id=${userId}) Deleted succesfully`,
            status: HttpStatus.OK,
            data: null,
        }

        return response
    }

    buildUser(newUser: Partial<EditUserDto>): User {
        return new UserBuilder(newUser)
            .firstName(new Name(newUser.firstName))
            .lastName(new Name(newUser.lastName))
            .avatar(new Avatar(newUser.avatar))
            .password(new Password(newUser.password))
            .phone(new Phone(newUser.phone))
            .email(new Email(newUser.email))
            .role(newUser?.role ?? UserRoles.BUYER)
            .build()
    }
}
