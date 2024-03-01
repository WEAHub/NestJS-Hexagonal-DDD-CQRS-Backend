import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateProductCommand } from '../../domain/commands/CreateProduct'
import { CreateProductUseCases } from '../use-cases/CreateProduct'

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
    implements ICommandHandler<CreateProductCommand>
{
    constructor(private useCases: CreateProductUseCases) {}

    async execute(command: CreateProductCommand) {
        return this.useCases.create(command.product)
    }
}
