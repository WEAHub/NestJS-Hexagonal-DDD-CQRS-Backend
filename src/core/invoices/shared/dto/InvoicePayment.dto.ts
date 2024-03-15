import { UserLocation } from '@core/invoices/domain/interfaces/UserLocation'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class InvoicePaymentDto {
    @IsNotEmpty()
    @IsString()
    paymentData: string

    @IsNotEmpty()
    @Type(() => UserLocation)
    shipping: UserLocation
}
