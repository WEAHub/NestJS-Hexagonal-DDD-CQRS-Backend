import { User } from '@core/user/domain/interfaces/User'
import { UserService } from '@core/user/domain/services/UserService'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserUseCases {
    constructor(private userService: UserService) {}

    async getUser(userId: number): Promise<User> {
        const user: User = await this.userService.getUser(userId)
        delete user.password
        return user
    }
}
