import { UpdateProductDto } from '@core/products/shared/dto/UpdateProduct.dto'

export class UpdateProductCommand {
    constructor(
        public readonly id: number,
        public readonly product: UpdateProductDto,
    ) {}
}
