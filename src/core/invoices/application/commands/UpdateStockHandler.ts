import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateStockUseCases } from '../use-cases/UpdateStock'
import { UpdateStockCommand } from '@core/invoices/domain/commands/UpdateStock'

@CommandHandler(UpdateStockCommand)
export class UpdateStockCommandHandler
    implements ICommandHandler<UpdateStockCommand>
{
    constructor(private useCases: UpdateStockUseCases) {}

    async execute(command: UpdateStockCommand) {
        return this.useCases.create(command.invoice)
    }
}
