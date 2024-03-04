import { ApiProperty } from '@nestjs/swagger'
import {
    IsEnum,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'
import { UserRoles } from '../enums/user-roles.enum'
import { Type } from 'class-transformer'
import { UserLocationDto } from './UserLocation.dto'

export class EditUserDto {
    /*     @ApiProperty({ description: 'User Id', required: true })
    @IsNotEmpty()
    @IsNumber()
    id: number */

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

    @ApiProperty({ description: 'User location', required: true })
    @IsOptional()
    @Type(() => UserLocationDto)
    @ValidateNested()
    location: UserLocationDto

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
