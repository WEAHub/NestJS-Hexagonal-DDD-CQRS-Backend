import { UpdateCategoryDto } from '@core/category/shared/dto/UpdateCategory.dto'

export class UpdateCategoryCommand {
    constructor(
        public readonly id: number,
        public readonly category: UpdateCategoryDto,
    ) {}
}
