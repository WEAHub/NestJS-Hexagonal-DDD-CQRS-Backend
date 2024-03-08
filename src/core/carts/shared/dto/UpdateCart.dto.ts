import { CartProduct } from '@core/carts/domain/interfaces/CartProduct'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'

class CartProductDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number

    @IsNotEmpty()
    @IsNumber()
    quantity: number
}

export class UpdateCartDto {
    @IsNotEmpty()
    @IsArray()
    @Type(() => CartProductDto)
    @ValidateNested({ each: true })
    products: CartProduct[]
}
