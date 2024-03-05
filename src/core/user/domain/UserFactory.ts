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
            firstName: new Name(options.firstName),
            lastName: new Name(options.lastName),
            password: new Password(options.password),
            avatar: new Avatar(options.avatar),
            location: options.location ?? {},
            email: new Email(options.email),
            phone: new Phone(options.phone),
            role: options?.role ?? UserRoles.BUYER,
        }

        const _user = new User(properties)
        return this.eventPublisher.mergeObjectContext(_user)
    }
}
