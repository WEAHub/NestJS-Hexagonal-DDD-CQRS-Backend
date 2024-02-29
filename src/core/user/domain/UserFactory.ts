import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { UserProperties, User } from './User'
import { User as IUser } from './interfaces/User'
import { Avatar } from './vo/Avatar'
import { Email } from './vo/Email'
import { Name } from './vo/Name'
import { Password } from './vo/Password'
import { Phone } from './vo/Phone'
import { UserRoles } from '../shared/enums/user-roles.enum'

export class UserFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

    create(options: IUser): User {
        const properties: UserProperties = {
            ...options, //id

            firstName: options?.firstName
                ? new Name(options.firstName)
                : undefined,

            lastName: options?.lastName
                ? new Name(options.lastName)
                : undefined,

            password: this.checkProp(
                options?.password,
                () => new Password(options.password),
            ),

            avatar: this.checkProp(
                options?.avatar,
                () => new Avatar(options.avatar),
            ),

            location: options.location ?? {},

            email: this.checkProp(
                options?.email,
                () => new Email(options.email),
            ),

            phone: this.checkProp(
                options?.phone,
                () => new Phone(options.phone),
            ),

            role: options?.role ?? UserRoles.BUYER,
        }

        const _user = new User(properties)
        return this.eventPublisher.mergeObjectContext(_user)
    }

    private checkProp(value: any, callback: () => any): any {
        return (
            (value !== undefined && value !== null && callback()) ?? undefined
        )
    }
}
