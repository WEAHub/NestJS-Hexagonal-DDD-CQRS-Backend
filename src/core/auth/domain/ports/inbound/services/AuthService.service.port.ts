import { LoginDto } from '@core/auth/shared/dto/Login.dto'
import { User } from '@core/user/domain/interfaces/User'

export interface AuthServicePort {
    checkUser(user: LoginDto): Promise<User>
}
