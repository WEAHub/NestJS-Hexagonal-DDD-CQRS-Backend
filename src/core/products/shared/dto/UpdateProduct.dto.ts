import { ProductModifier } from '@core/products/domain/interfaces/ProductModifier'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'
import { ProductModifierDto } from './ProductModifier.dto'

export class UpdateProductDto {
    @ApiProperty({ description: 'Product Name', required: true })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ description: 'Product Image', required: true })
    @IsNotEmpty()
    @IsString()
    image: string

    @ApiProperty({ description: 'Product Description', required: true })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({ description: 'Product Stock', required: true })
    @IsNotEmpty()
    @IsNumber()
    stock: number

    @ApiProperty({ description: 'Product Stock total', required: true })
    @IsNotEmpty()
    @IsNumber()
    stockTotal: number

    @ApiProperty({ description: 'Product Modifiers', required: true })
    @IsOptional()
    @Type(() => ProductModifierDto)
    @IsNotEmptyObject()
    @ValidateNested()
    modifiers: ProductModifier

    @ApiProperty({ description: 'Product Category', required: true })
    @IsNotEmpty()
    @IsNumber()
    categoryId: number

    @ApiProperty({ description: 'Product PRice', required: true })
    @IsNotEmpty()
    @IsNumber()
    price: number
}
