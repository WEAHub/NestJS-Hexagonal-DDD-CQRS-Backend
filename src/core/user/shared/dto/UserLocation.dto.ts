import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class UserLocationDto {
    @ApiProperty({ description: 'Complete address', required: true })
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty({ description: 'Street name', required: true })
    @IsNotEmpty()
    @IsString()
    street: string

    @ApiProperty({ description: 'Province name', required: true })
    @IsNotEmpty()
    @IsString()
    province: string

    @ApiProperty({ description: 'Street number', required: true })
    @IsNotEmpty()
    @IsNumber()
    number: number

    @ApiProperty({ description: 'City name', required: true })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({ description: 'Postal code', required: true })
    @IsNotEmpty()
    @IsNumber()
    zipcode: number

    @ApiProperty({ description: 'Latitude', required: true })
    @IsNotEmpty()
    @IsNumber()
    lat: number

    @ApiProperty({ description: 'Longitude', required: true })
    @IsNotEmpty()
    @IsNumber()
    long: number
}
