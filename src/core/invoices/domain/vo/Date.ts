import { ValueObject } from '@core/shared/ddd/ValueObject'

export class DateVo extends ValueObject<Date> {
    constructor(date: Date) {
        super(date, `${date} is invalid Date`)
    }

    protected validate(date: Date): boolean {
        try {
            new Date(date)
            return true
        } catch (e) {
            return false
        }
    }
}
