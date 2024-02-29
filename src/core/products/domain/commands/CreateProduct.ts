import { CreateProductDto } from '@core/products/shared/dto/CreateProduct.dto'

export class CreateProductCommand {
    constructor(public readonly product: CreateProductDto) {}
}
