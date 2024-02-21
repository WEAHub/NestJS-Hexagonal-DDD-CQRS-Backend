import { ValueObject } from '@core/shared/ddd/ValueObject'

export class Avatar extends ValueObject<string> {
    constructor(avatar: string) {
        super(avatar, `${avatar} is invalid avatar url`)
    }

    protected validate(avatar: string): boolean {
        try {
            new URL(avatar)
            return true
        } catch (err) {
            return false
        }
    }
}
