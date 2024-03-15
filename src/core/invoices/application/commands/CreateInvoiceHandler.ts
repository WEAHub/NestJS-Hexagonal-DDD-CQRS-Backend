import { CreateInvoiceCommand } from '@core/invoices/domain/commands/CreateInvoice'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateInvoiceUseCases } from '../use-cases/CreateInvoice'

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceCommandHandler
    implements ICommandHandler<CreateInvoiceCommand>
{
    constructor(private useCases: CreateInvoiceUseCases) {}

    async execute(command: CreateInvoiceCommand) {
        return this.useCases.create(command.userId, command.paymentBody)
    }
}
