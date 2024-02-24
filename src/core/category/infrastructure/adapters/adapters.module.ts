import { Module } from '@nestjs/common'
import { InMemoryEventBus } from '@core/shared/domain/services/eventbus/in-memory-event-bus.service'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from './secondary/db/entities/category.entity'
import { PostgresCategoryRepository } from './secondary/db/postgres-category.repository'
import { CATEGORY_REPOSITORY } from '@core/category/shared/dependency-tokens/repositories'
import { GetCategoryController } from './primary/http/get.controller'
import { CreateCategoryController } from './primary/http/create.controller'

const controllers = [GetCategoryController, CreateCategoryController]

const providers = [
    PostgresCategoryRepository,
    InMemoryEventBus,
    {
        provide: CATEGORY_REPOSITORY,
        useExisting: PostgresCategoryRepository,
    },
]

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([CategoryEntity])],
    providers: providers,
    controllers,
    exports: providers,
})
export class CategoryAdaptersModule {}
