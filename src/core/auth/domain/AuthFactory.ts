import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { AuthProperties, Auth } from './Auth'
import { UserAuth } from './interfaces/UserAuth'
import { Email } from './vo/Email'
import { Password } from './vo/Password'

export class AuthFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

    create(options: UserAuth): Auth {
        const properties: AuthProperties = {
            email: new Email(options.email),
            password: new Password(options.password),
        }

        const auth = new Auth(properties)
        return this.eventPublisher.mergeObjectContext(auth)
    }
}
