import { ValueObject } from '@core/shared/ddd/ValueObject'

export class Password extends ValueObject<string> {
    constructor(
        password: string,
        private isHash: boolean = false,
    ) {
        super(password, `${password} is invalid password`)
    }

    protected validate(password: string): boolean {
        if (this.isHash) return true

        const passwordPattern =
            /(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}/

        return passwordPattern.test(password)
    }
}
