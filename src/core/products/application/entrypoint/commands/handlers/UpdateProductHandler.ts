import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateProductCommand } from '../UpdateProduct'
import { ProductUseCases } from '@core/products/application/services/ProductUseCases'

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
    implements ICommandHandler<UpdateProductCommand>
{
    constructor(private product: ProductUseCases) {}

    async execute(command: UpdateProductCommand) {
        return this.product.update(command.id, command.product)
    }
}
