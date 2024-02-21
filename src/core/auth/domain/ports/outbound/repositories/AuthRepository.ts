import { User } from '@core/user/domain/interfaces/User'

export interface AuthRepository {
    findByEmail(email: string): Promise<User>
}
