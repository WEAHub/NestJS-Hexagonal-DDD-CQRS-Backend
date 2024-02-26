import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
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

    /*     
    @Column({ name: 'product_modifiers', nullable: true, type: 'json' })
    modifiers: ProductModifier 
    */

    @ApiProperty({ description: 'Product Category', required: true })
    @IsNotEmpty()
    @IsNumber()
    categoryId: number

    @ApiProperty({ description: 'Product PRice', required: true })
    @IsNotEmpty()
    @IsNumber()
    price: number
}
