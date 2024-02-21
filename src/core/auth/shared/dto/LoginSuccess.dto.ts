import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginSuccessDto {
    @ApiProperty({ description: 'Access Token' })
    @IsNotEmpty()
    @IsString()
    accessToken: string

    @ApiProperty({ description: 'Refresh Token' })
    @IsNotEmpty()
    @IsString()
    refreshToken: string
}
