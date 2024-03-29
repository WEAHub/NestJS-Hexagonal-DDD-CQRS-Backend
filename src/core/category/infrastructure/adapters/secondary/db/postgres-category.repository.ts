import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryEntity } from './entities/category.entity'
import { Category } from '@core/category/domain/interfaces/Category'
import { CategoryRepository } from '@core/category/domain/ports/outbound/repositories/CategoryRepository'

@Injectable()
export class PostgresCategoryRepository implements CategoryRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private repository: Repository<CategoryEntity>,
    ) {}

    async findById(id: number): Promise<Category> {
        return this.repository.findOneBy({ id })
    }

    async findByName(name: string): Promise<Category> {
        return this.repository.findOneBy({ name })
    }

    async findAll(): Promise<Category[]> {
        return this.repository.find()
    }

    async save(category: Category): Promise<Category> {
        return this.repository.save(category)
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.repository.delete({ id })
        return deleted.affected > 0
    }
}
