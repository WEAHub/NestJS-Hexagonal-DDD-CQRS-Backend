import { AggregateRoot } from '@nestjs/cqrs'
import { Email } from './vo/Email'
import { Password } from './vo/Password'
import { UserAuth } from './interfaces/UserAuth'
import { UserLoginEvent } from './events/UserLoginEvent'

export interface AuthProperties {
    email: Email
    password: Password
}

export class Auth extends AggregateRoot {
    email: Email
    password: Password

    constructor(properties: AuthProperties) {
        super()
        Object.assign(this, properties)
    }

    logged(): void {
        this.apply(new UserLoginEvent(this.email.getValue()))
    }

    toPrimitives(): UserAuth {
        return {
            email: this.email.getValue(),
            password: this.password.getValue(),
        }
    }
}
