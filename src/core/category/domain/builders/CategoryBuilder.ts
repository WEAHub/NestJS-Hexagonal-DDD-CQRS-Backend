import { Name } from '@core/user/domain/vo/Name'
import { Category } from '../interfaces/Category'

export class CategoryBuilder {
    constructor(
        private category: Category,
        private strict: boolean = true,
    ) {}

    name(name: string): CategoryBuilder {
        if (!this.strict && !name) return this
        this.category.name = new Name(name).getValue()
        return this
    }

    description(description: string): CategoryBuilder {
        if (!this.strict && !description) return this
        this.category.description = new Name(description).getValue()
        return this
    }

    build(): Category {
        return {
            name: this.category.name,
            description: this.category.description,
        }
    }
}
