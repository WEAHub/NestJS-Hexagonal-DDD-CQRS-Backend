import { Category } from '@core/category/domain/interfaces/Category'

export class UpdatedCategoryEvent {
    constructor(
        public readonly category: Category,
        public readonly updatedCategory: Category,
    ) {}
}
