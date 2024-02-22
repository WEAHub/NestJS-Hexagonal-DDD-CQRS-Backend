import { Token } from '@core/auth/domain/interfaces/Token'
import { User } from '@core/user/domain/interfaces/User'

export interface TokenServicePort {
    generateAccessToken(user: User): Promise<string>
    generateRefreshToken(user: User): Promise<string>
    verify(token: string, secret: string): Promise<Token>
}
