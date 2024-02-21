import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
    @ApiProperty({ description: 'Email' })
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty({ description: 'Password' })
    @IsNotEmpty()
    @IsString()
    password: string
}
