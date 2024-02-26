import { ValueObject } from '@core/shared/ddd/ValueObject'

export class Image extends ValueObject<string> {
    constructor(image: string) {
        super(image, `${image} is invalid image url`)
    }

    protected validate(image: string): boolean {
        try {
            new URL(image)
            return true
        } catch (err) {
            return false
        }
    }
}
