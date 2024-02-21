import { User } from '../../../interfaces/User'
import { SaveOptions } from 'typeorm'

export interface UserRepository {
    findById(userId: number): Promise<User>
    create(user: User): Promise<User>
    save(user: User, options?: SaveOptions): Promise<User>
    findByEmail(email: string): Promise<User>
}
