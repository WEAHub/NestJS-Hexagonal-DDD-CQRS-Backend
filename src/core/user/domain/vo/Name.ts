import { ValueObject } from '@core/shared/ddd/ValueObject'

export class Name extends ValueObject<string> {
    constructor(name: string) {
        super(name, `${name} is invalid name`)
    }

    protected validate(name: string): boolean {
        return Boolean(name?.length)
    }
}
