import { ApiProperty } from '@nestjs/swagger'
import {
    IsNotEmpty,
    IsNotEmptyObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'
import { UserLocationDto } from './UserLocation.dto'
import { Type } from 'class-transformer'

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

    @ApiProperty({ description: 'User location', required: true })
    @IsOptional()
    @Type(() => UserLocationDto)
    @IsNotEmptyObject()
    @ValidateNested()
    location: UserLocationDto

    @ApiProperty({ description: 'Email', required: true })
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty({ description: 'Phone', required: true })
    @IsString()
    phone: string
}
