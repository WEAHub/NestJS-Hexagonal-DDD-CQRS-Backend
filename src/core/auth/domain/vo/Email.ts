import { ValueObject } from '@core/shared/ddd/ValueObject'

export class Email extends ValueObject<string> {
    constructor(email: string) {
        super(email, `${email} is invalid email`)
    }

    protected validate(email: string): boolean {
        const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
        return emailPattern.test(email)
    }
}
