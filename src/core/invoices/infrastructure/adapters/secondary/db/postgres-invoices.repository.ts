import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceEntity } from './entities/invoice.entity'
import { InvoicesRepository } from '@core/invoices/domain/ports/outbound/repositories/InvoicesRepository'
import { Invoice } from '@core/invoices/domain/interfaces/Invoice'

@Injectable()
export class PostgresInvoicesRepository implements InvoicesRepository {
    constructor(
        @InjectRepository(InvoiceEntity)
        private repository: Repository<InvoiceEntity>,
    ) {}

    async findById(id: number): Promise<Invoice> {
        return this.repository.findOneBy({ id })
    }

    async findByUserId(userId: number): Promise<Invoice> {
        return this.repository.findOneBy({ userId })
    }

    async findAll(): Promise<Invoice[]> {
        return this.repository.find()
    }

    async save(invoice: Invoice): Promise<Invoice> {
        return this.repository.save(invoice)
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.repository.delete({ id })
        return deleted.affected > 0
    }
}
