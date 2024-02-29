import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from './secondary/db/entities/category.entity'
import { PostgresCategoryRepository } from './secondary/db/postgres-category.repository'
import { CATEGORY_REPOSITORY } from '@core/category/shared/dependency-tokens/repositories'
import { GetCategoryController } from './primary/http/get.controller'
import { CreateCategoryController } from './primary/http/create.controller'
import { DeleteCategoryController } from './primary/http/delete.controller'
import { UpdateCategoryController } from './primary/http/update.controller'

const controllers = [
    GetCategoryController,
    CreateCategoryController,
    DeleteCategoryController,
    UpdateCategoryController,
]

const providers = [
    PostgresCategoryRepository,
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
