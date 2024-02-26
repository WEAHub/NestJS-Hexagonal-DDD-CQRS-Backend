import { User } from '@core/user/domain/interfaces/User'
import { SaveOptions } from 'typeorm'

export interface UserServicePort {
    getUser(userId: number): Promise<User>
    create(user: User): Promise<User>
    save(user: User, options?: SaveOptions): Promise<User>
    checkUser(email: string): Promise<User>
    delete(userId: number): Promise<boolean>
}
