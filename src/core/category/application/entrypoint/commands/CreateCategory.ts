import { CreateCategoryDto } from '@core/category/shared/dto/CreateCategory.dto'

export class CreateCategoryCommand {
    constructor(public readonly category: CreateCategoryDto) {}
}
