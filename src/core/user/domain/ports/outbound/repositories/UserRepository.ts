import { User } from '../../../interfaces/User'

export interface UserRepository {
    findById(userId: number): Promise<User>
}
