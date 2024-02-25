import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateCategoryDto {
    @ApiProperty({ description: 'Category name', required: true })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ description: 'Category description', required: true })
    @IsNotEmpty()
    @IsString()
    description: string
}
