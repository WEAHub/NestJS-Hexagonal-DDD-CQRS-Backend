import { ValueObject } from '@core/shared/ddd/ValueObject'

export class CategoryDescription extends ValueObject<string> {
    constructor(description: string) {
        super(description, `${description} is invalid name`)
    }

    protected validate(description: string): boolean {
        return Boolean(description?.length) && description.length < 20
    }
}
