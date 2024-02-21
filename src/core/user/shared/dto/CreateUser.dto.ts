export interface CreateUserDto {
    firstName: string
    lastName: string
    password: string
    avatar: string
    street?: string
    number?: number
    city?: string
    postalCode?: number
    lat?: number
    lng?: number
    email: string
    phone: string
}
