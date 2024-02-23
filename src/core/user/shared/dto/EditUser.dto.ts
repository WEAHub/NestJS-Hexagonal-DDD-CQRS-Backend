import { ApiProperty } from '@nestjs/swagger'
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'
import { UserRoles } from '../enums/user-roles.enum'

export class EditUserDto {
    @ApiProperty({ description: 'User Id', required: true })
    @IsNotEmpty()
    @IsNumber()
    id: number

    @ApiProperty({ description: 'First name', required: true })
    @IsString()
    @IsOptional()
    firstName: string

    @ApiProperty({ description: 'Last name', required: true })
    @IsString()
    @IsOptional()
    lastName: string

    @ApiProperty({ description: 'Password', required: true })
    @IsString()
    @IsOptional()
    password: string

    @ApiProperty({ description: 'Avatar URL', required: true })
    @IsString()
    @IsOptional()
    avatar: string

    @ApiProperty({ description: 'Street name', required: true })
    @IsString()
    @IsOptional()
    street: string

    @ApiProperty({ description: 'Street number', required: true })
    @IsNumber()
    @IsOptional()
    number: number

    @ApiProperty({ description: 'City name', required: true })
    @IsString()
    @IsOptional()
    city: string

    @ApiProperty({ description: 'Postal code', required: true })
    @IsNumber()
    @IsOptional()
    postalCode: number

    @ApiProperty({ description: 'Latitude', required: true })
    @IsNumber()
    @IsOptional()
    lat: number

    @ApiProperty({ description: 'Longitude', required: true })
    @IsNumber()
    @IsOptional()
    lng: number

    @ApiProperty({ description: 'Email', required: true })
    @IsString()
    @IsOptional()
    email: string

    @ApiProperty({ description: 'Phone', required: true })
    @IsString()
    @IsOptional()
    phone: string

    @ApiProperty({ description: 'Role', required: true })
    @IsEnum(UserRoles)
    @IsOptional()
    role: UserRoles
}
