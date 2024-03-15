import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject, Logger } from '@nestjs/common'
import { CreatedInvoiceEvent } from '@core/invoices/domain/events/InvoiceCreated'
import { UpdateStockCommand } from '@core/invoices/domain/commands/UpdateStock'

@EventsHandler(CreatedInvoiceEvent)
export class CreatedInvoiceEventHandler
    implements IEventHandler<CreatedInvoiceEvent>
{
    @Inject()
    private readonly command: CommandBus

    async handle(event: CreatedInvoiceEvent) {
        Logger.log(
            `Invoice(id=${event.invoice.id}) for User(id=${event.invoice.userId}) created`,
            event.getName(),
        )
        this.command.execute(new UpdateStockCommand(event.invoice))
    }
}
