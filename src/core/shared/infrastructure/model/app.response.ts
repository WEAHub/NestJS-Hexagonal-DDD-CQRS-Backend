import { ApiProperty } from '@nestjs/swagger'

export class AppResponse<T> {
    @ApiProperty()
    status: number
    @ApiProperty()
    message: string
    @ApiProperty({ nullable: true })
    data?: T
}
