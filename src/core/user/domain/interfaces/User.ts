import { UserLocation } from './UserLocation'

export class User {
    id?: number
    firstName: string
    lastName: string
    password: string
    avatar: string
    location: UserLocation
    email: string
    phone: string
}
