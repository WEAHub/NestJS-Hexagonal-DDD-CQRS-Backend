import { User } from '../interfaces/User'

export class GetInvoicePreviewQuery {
    constructor(public readonly user: User) {}
}
