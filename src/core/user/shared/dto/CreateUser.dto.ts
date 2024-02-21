import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ description: 'First name', required: true })
    @IsNotEmpty()
    @IsString()
    firstName: string

    @ApiProperty({ description: 'Last name', required: true })
    @IsNotEmpty()
    @IsString()
    lastName: string

    @ApiProperty({ description: 'Password', required: true })
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty({ description: 'Avatar URL', required: true })
    @IsNotEmpty()
    @IsString()
    avatar: string

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

    @ApiProperty({ description: 'Email', required: true })
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty({ description: 'Phone', required: true })
    @IsString()
    phone: string
}
