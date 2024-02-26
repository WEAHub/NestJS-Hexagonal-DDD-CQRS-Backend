import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateProductCommand } from '../CreateProduct'
import { ProductUseCases } from '@core/products/application/services/ProductUseCases'

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
    implements ICommandHandler<CreateProductCommand>
{
    constructor(private product: ProductUseCases) {}

    async execute(command: CreateProductCommand) {
        return this.product.create(command.product)
    }
}
