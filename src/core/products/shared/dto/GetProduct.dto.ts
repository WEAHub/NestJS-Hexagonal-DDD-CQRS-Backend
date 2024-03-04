import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator'
import { ProductSorts } from '../enums/ProductSorts'
import { Type } from 'class-transformer'

export class GetProductDto {
    @IsString()
    @IsOptional()
    @IsEnum(ProductSorts)
    sort: ProductSorts

    @IsNumber()
    @IsOptional()
    @Max(100)
    @Min(0)
    @Type(() => Number)
    limit: number

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    page: number

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    category: number
}
