import { ProductModifier } from '@core/products/domain/interfaces/ProductModifier'
import { IsDefined, IsNumber, IsOptional } from 'class-validator'

export class ProductModifierDto implements ProductModifier {
    @IsOptional()
    @IsDefined()
    @IsNumber()
    discountPercent: number
}
