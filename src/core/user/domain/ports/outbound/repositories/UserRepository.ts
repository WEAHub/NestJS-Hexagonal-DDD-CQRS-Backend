import { User } from '../../../interfaces/User'
import { SaveOptions } from 'typeorm'

export interface UserRepository {
    findById(id: number): Promise<User>
    findByEmail(email: string): Promise<User>
    create(user: User): Promise<User>
    save(user: User, options?: SaveOptions): Promise<User>
    delete(id: number): Promise<boolean>
}
