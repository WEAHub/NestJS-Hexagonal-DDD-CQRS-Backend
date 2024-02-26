import { ProductModifier } from '@core/products/domain/interfaces/ProductModifier'
import { IsBoolean, IsDefined, IsNumber, IsOptional } from 'class-validator'

export class ProductModifierDto implements ProductModifier {
    @IsOptional()
    @IsDefined()
    @IsNumber()
    discountPercent: number

    @IsOptional()
    @IsDefined()
    @IsBoolean()
    hasChoice: boolean
}
