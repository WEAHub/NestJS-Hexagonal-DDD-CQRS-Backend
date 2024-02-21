import { ValueObject } from '@core/shared/ddd/ValueObject'

export class Phone extends ValueObject<string> {
    constructor(phone: string) {
        super(phone, `${phone} is invalid Phone`)
    }

    protected validate(phone: string): boolean {
        const phonePattern = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/

        return phonePattern.test(phone)
    }
}
