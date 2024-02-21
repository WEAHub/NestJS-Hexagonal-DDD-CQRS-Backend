import { CreateUserDto } from '@core/user/shared/dto/CreateUser.dto'
import { Name } from '../vo/Name'
import { Password } from '../vo/Password'
import { Avatar } from '../vo/Avatar'
import { Email } from '../vo/Email'
import { Phone } from '../vo/Phone'
import { User } from '../interfaces/User'
import { UserLocation } from '../interfaces/UserLocation'

export class UserBuilder {
    constructor(private user: CreateUserDto) {}

    firstName(name: Name): UserBuilder {
        this.user.firstName = name.getValue()
        return this
    }

    lastName(name: Name): UserBuilder {
        this.user.lastName = name.getValue()
        return this
    }

    password(password: Password): UserBuilder {
        this.user.password = password.getValue()
        return this
    }

    avatar(avatar: Avatar): UserBuilder {
        this.user.firstName = avatar.getValue()
        return this
    }

    street(street: string): UserBuilder {
        this.user.street = street
        return this
    }

    number(number: number): UserBuilder {
        this.user.number = number
        return this
    }

    city(city: string): UserBuilder {
        this.user.city = city
        return this
    }

    postalCode(postalCode: number): UserBuilder {
        this.user.postalCode = postalCode
        return this
    }

    lat(lat: number): UserBuilder {
        this.user.lat = lat
        return this
    }

    lng(lng: number): UserBuilder {
        this.user.lng = lng
        return this
    }

    email(email: Email): UserBuilder {
        this.user.email = email.getValue()
        return this
    }

    phone(phone: Phone): UserBuilder {
        this.user.phone = phone.getValue()
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

        return {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            password: this.user.password,
            avatar: this.user.avatar,
            email: this.user.email,
            phone: this.user.phone,
            location,
        }
    }
}
