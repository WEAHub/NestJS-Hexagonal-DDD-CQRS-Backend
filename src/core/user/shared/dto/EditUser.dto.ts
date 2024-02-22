import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { UserRoles } from '../enums/user-roles.enum'

export class EditUserDto {
    @ApiProperty({ description: 'User Id', required: true })
    @IsNotEmpty()
    @IsNumber()
    id: number

    @ApiProperty({ description: 'First name', required: true })
    @IsString()
    firstName: string

    @ApiProperty({ description: 'Last name', required: true })
    @IsString()
    lastName: string

    @ApiProperty({ description: 'Password', required: true })
    @IsString()
    password: string

    @ApiProperty({ description: 'Avatar URL', required: true })
    @IsString()
    avatar: string

    @ApiProperty({ description: 'Street name', required: true })
    @IsString()
    street: string

    @ApiProperty({ description: 'Street number', required: true })
    @IsNumber()
    number: number

    @ApiProperty({ description: 'City name', required: true })
    @IsString()
    city: string

    @ApiProperty({ description: 'Postal code', required: true })
    @IsNumber()
    postalCode: number

    @ApiProperty({ description: 'Latitude', required: true })
    @IsNumber()
    lat: number

    @ApiProperty({ description: 'Longitude', required: true })
    @IsNumber()
    lng: number

    @ApiProperty({ description: 'Email', required: true })
    @IsString()
    email: string

    @ApiProperty({ description: 'Phone', required: true })
    @IsString()
    phone: string

    @ApiProperty({ description: 'Role', required: true })
    @IsEnum(UserRoles)
    role: UserRoles
}
