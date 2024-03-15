import { CreateInvoiceCommand } from '@core/invoices/domain/commands/CreateInvoice'
import { Invoice } from '@core/invoices/domain/interfaces/Invoice'
import { User } from '@core/invoices/domain/interfaces/User'
import { CreateInvoiceControllerPort } from '@core/invoices/domain/ports/inbound/controllers/create.controller'
import { InvoicePaymentDto } from '@core/invoices/shared/dto/InvoicePayment.dto'
import { CurrentUser } from '@core/shared/infrastructure/decorators/current-user.decorator'
import { GlobalExceptionFilter } from '@core/shared/infrastructure/exception-filters/global-exception.filter'
import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Get Invoices Controller')
@UseFilters(GlobalExceptionFilter)
@Controller('checkout')
export class CreateInvoiceController implements CreateInvoiceControllerPort {
    constructor(private command: CommandBus) {}

    @Post()
    async create(
        @CurrentUser() user: User,
        @Body() paymentData: InvoicePaymentDto,
    ): Promise<Invoice> {
        return this.command.execute(
            new CreateInvoiceCommand(user.id, paymentData),
        )
    }
}
