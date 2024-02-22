import { User } from '@core/user/domain/interfaces/User'

export interface Token {
    sub: number
    username: string
    email: string
}
