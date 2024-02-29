import { AggregateRoot } from '@nestjs/cqrs'
import { Name } from './vo/Name'
import { Password } from './vo/Password'
import { UserLocation } from './interfaces/UserLocation'
import { UserRoles } from '../shared/enums/user-roles.enum'
import { User as IUser } from './interfaces/User'
import { Avatar } from './vo/Avatar'
import { Email } from './vo/Email'
import { Phone } from './vo/Phone'
import { CreatedUserEvent } from './events/CreatedUserEvent'
import { DeletedUserEvent } from './events/DeletedUserEvent'
import { UpdatedUserEvent } from './events/UpdatedUserEvent'
import { ChangedUserPassword } from './events/ChangedUserPasswordEvent'

export interface UserProperties {
    id?: number
    firstName: Name
    lastName: Name
    password: Password
    avatar: Avatar
    location?: UserLocation
    email: Email
    phone: Phone
    role?: UserRoles
}

export class User extends AggregateRoot {
    user: UserProperties

    constructor(properties: UserProperties) {
        super()
        this.user = properties
    }

    created(): void {
        this.apply(new CreatedUserEvent(this.user.id))
    }

    updated(): void {
        this.apply(new UpdatedUserEvent(this.user.id))
    }

    deleted(): void {
        this.apply(new DeletedUserEvent(this.user.id))
    }

    changePassword(newPassword: string): void {
        this.user.password = new Password(newPassword, true)
        this.apply(new ChangedUserPassword(this.user.id))
    }

    toPrimitives(): IUser {
        return {
            id: this.user.id,
            firstName: this.user.firstName.getValue(),
            lastName: this.user.lastName.getValue(),
            password: this.user.password.getValue(),
            avatar: this.user.avatar.getValue(),
            location: this.user.location,
            email: this.user.email.getValue(),
            phone: this.user.phone.getValue(),
            role: this.user.role,
        }
    }
}
