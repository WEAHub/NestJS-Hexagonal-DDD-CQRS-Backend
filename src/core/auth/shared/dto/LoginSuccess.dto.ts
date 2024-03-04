import { UserLocation } from '@core/user/domain/interfaces/UserLocation'

export interface LoginSuccessDto {
    id?: number
    firstName: string
    lastName: string
    avatar: string
    location?: UserLocation
    email: string
    phone: string
    role?: string
    accessToken: string
    refreshToken: string
    password?: string
}
