import { GetProductDto } from '@core/products/shared/dto/GetProduct.dto'

export class GetAllProductQuery {
    constructor(public readonly productOptions: GetProductDto) {}
}
