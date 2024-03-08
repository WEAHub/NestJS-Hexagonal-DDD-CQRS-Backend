import { Invoice } from '@core/invoices/domain/interfaces/Invoice'
import { User } from '@core/invoices/domain/interfaces/User'
import { GetInvoiceControllerPort } from '@core/invoices/domain/ports/inbound/controllers/get.controller'
import { GetInvoicePreviewQuery } from '@core/invoices/domain/queries/GetInvoicePreview'
import { CurrentUser } from '@core/shared/infrastructure/decorators/current-user.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { Controller, Get, UseFilters } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Get Invoices Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('checkout')
export class GetInvoiceController implements GetInvoiceControllerPort {
    constructor(private query: QueryBus) {}

    @Get()
    async get(@CurrentUser() user: User): Promise<Invoice> {
        return this.query.execute(new GetInvoicePreviewQuery(user))
    }
}
