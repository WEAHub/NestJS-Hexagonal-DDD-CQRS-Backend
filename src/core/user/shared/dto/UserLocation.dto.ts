import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class UserLocationDto {
    @ApiProperty({ description: 'Street name', required: true })
    @IsNotEmpty()
    @IsString()
    street: string

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
    postalCode: number

    @ApiProperty({ description: 'Latitude', required: true })
    @IsNotEmpty()
    @IsNumber()
    lat: number

    @ApiProperty({ description: 'Longitude', required: true })
    @IsNotEmpty()
    @IsNumber()
    lng: number
}
