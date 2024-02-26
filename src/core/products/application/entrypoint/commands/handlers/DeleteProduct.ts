import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteProductCommand } from '../DeleteProduct'
import { ProductUseCases } from '@core/products/application/services/ProductUseCases'

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler
    implements ICommandHandler<DeleteProductCommand>
{
    constructor(private product: ProductUseCases) {}

    async execute(command: DeleteProductCommand) {
        return this.product.delete(command.id)
    }
}
