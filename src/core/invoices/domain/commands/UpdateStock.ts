import { Invoice } from '../interfaces/Invoice'
export class UpdateStockCommand {
    constructor(public readonly invoice: Invoice) {}
}
