import { ValueObject } from '@core/shared/ddd/ValueObject'

export class Number extends ValueObject<number> {
    constructor(number: number) {
        super(number, `${number} is invalid name`)
    }

    protected validate(number: number): boolean {
        return number > -1
    }
}
