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
import { CreateUserSuccessDto } from '@core/user/shared/dto/CreateUserSuccess.dto'
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

    async create(newUser: CreateUserDto): Promise<CreateUserSuccessDto> {
        await this.userService.checkUser(newUser.email)

        const user: User = new UserBuilder(newUser)
            .firstName(new Name(newUser.firstName))
            .lastName(new Name(newUser.lastName))
            .avatar(new Avatar(newUser.avatar))
            .password(new Password(newUser.password))
            .phone(new Phone(newUser.phone))
            .email(new Email(newUser.email))
            .build()

        const encryptedPassword = await this.passwordService.encrypt(
            user.password,
        )

        const userEntity: User = await this.userService.create({
            ...user,
            password: encryptedPassword,
        })

        this.userService.save(userEntity)

        const response: AppResponse = {
            status: HttpStatus.OK,
            message: 'User created successfully',
            data: userEntity,
        }
        
        return response
    }
}
