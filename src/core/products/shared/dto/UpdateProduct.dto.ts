import { ProductModifier } from '@core/products/domain/interfaces/ProductModifier'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'
import { ProductModifierDto } from './ProductModifier.dto'

export class UpdateProductDto {
    @ApiProperty({ description: 'Product Name', required: true })
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty({ description: 'Product Image', required: true })
    @IsOptional()
    @IsString()
    image: string

    @ApiProperty({ description: 'Product Description', required: true })
    @IsOptional()
    @IsString()
    description: string

    @ApiProperty({ description: 'Product Stock', required: true })
    @IsOptional()
    @IsNumber()
    stock: number

    @ApiProperty({ description: 'Product Stock total', required: true })
    @IsOptional()
    @IsNumber()
    stockTotal: number

    @ApiProperty({ description: 'Product Modifiers', required: true })
    @IsOptional()
    @Type(() => ProductModifierDto)
    @ValidateNested()
    modifiers: ProductModifier

    @ApiProperty({ description: 'Product Category', required: true })
    @IsOptional()
    @IsNumber()
    categoryId: number

    @ApiProperty({ description: 'Product Price', required: true })
    @IsOptional()
    @IsNumber()
    price: number

    @ApiProperty({ description: 'Product Publish State', required: true })
    @IsOptional()
    @IsBoolean()
    published: boolean
}
