import { Name } from '../vo/Name'
import { Password } from '../vo/Password'
import { Avatar } from '../vo/Avatar'
import { Email } from '../vo/Email'
import { Phone } from '../vo/Phone'
import { User } from '../interfaces/User'
import { UserLocation } from '../interfaces/UserLocation'
import { UserRoles } from '@core/user/shared/enums/user-roles.enum'
import { EditUserDto } from '@core/user/shared/dto/EditUser.dto'
import { cleanEmptyValues } from '@core/shared/utils/clearEmptyValues'
import { Logger } from '@nestjs/common'

type UserDto = Partial<EditUserDto>

export class UserBuilder {
    constructor(
        private user: UserDto,
        private strict: boolean = true,
    ) {}

    firstName(name: string): UserBuilder {
        if (!this.strict && !name) return this
        this.user.firstName = new Name(name).getValue()
        return this
    }

    lastName(name: string): UserBuilder {
        if (!this.strict && !name) return this
        this.user.lastName = new Name(name).getValue()
        return this
    }

    password(password: string): UserBuilder {
        if (!this.strict && !password) return this
        this.user.password = new Password(password).getValue()
        return this
    }

    avatar(avatar: string): UserBuilder {
        if (!this.strict && !avatar) return this
        this.user.firstName = new Avatar(avatar).getValue()
        return this
    }

    street(street: string): UserBuilder {
        if (!this.strict && !street) return this
        this.user.street = street
        return this
    }

    number(number: number): UserBuilder {
        if (!this.strict && !number) return this
        this.user.number = number
        return this
    }

    city(city: string): UserBuilder {
        if (!this.strict && !city) return this
        this.user.city = city
        return this
    }

    postalCode(postalCode: number): UserBuilder {
        if (!this.strict && !postalCode) return this
        this.user.postalCode = postalCode
        return this
    }

    lat(lat: number): UserBuilder {
        if (!this.strict && !lat) return this
        this.user.lat = lat
        return this
    }

    lng(lng: number): UserBuilder {
        if (!this.strict && !lng) return this
        this.user.lng = lng
        return this
    }

    email(email: string): UserBuilder {
        if (!this.strict && !email) return this
        this.user.email = new Email(email).getValue()
        return this
    }

    phone(phone: string): UserBuilder {
        if (!this.strict && !phone) return this
        this.user.phone = new Phone(phone).getValue()
        return this
    }

    role(role: UserRoles): UserBuilder {
        if (!this.strict && !role) return this
        this.user.role = role
        return this
    }

    build(): User {
        const location: UserLocation = {
            city: this.user.city,
            lat: this.user.lat,
            lng: this.user.lng,
            number: this.user.number,
            postalCode: this.user.postalCode,
            street: this.user.street,
        }

        const user: User = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            password: this.user.password,
            avatar: this.user.avatar,
            email: this.user.email,
            phone: this.user.phone,
            role: this.user.role,
            location,
        }

        const validUser: User = cleanEmptyValues<User>(user)
        return validUser
    }
}
