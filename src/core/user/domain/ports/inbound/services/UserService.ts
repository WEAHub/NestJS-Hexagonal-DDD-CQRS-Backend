import { User } from '@core/user/domain/interfaces/User'

export interface UserServicePort {
    getUser(userId: number): Promise<User>
    create(user: User): Promise<User>
    save(user: User): Promise<User>
    checkUser(email: string): Promise<User>
}
