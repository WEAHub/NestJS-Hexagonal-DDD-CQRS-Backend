import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopyDatabaseModule } from './shopy-database/shopy-database.module';
import { CategoryEntity } from './shopy-database/entities/category.entity';
import { ProductEntity } from './shopy-database/entities/product.entity';
import { UserEntity } from './shopy-database/entities/user.entity';


@Module({
  imports: [
    ShopyDatabaseModule,
    TypeOrmModule.forFeature([
      CategoryEntity,
      ProductEntity,
      UserEntity,
    ]),
  ],
  exports: [
    ShopyDatabaseModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ]
})
export class PersistenceModule {}
