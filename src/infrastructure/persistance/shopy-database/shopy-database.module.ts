import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../../shared/config/database.config';
import { TransactionProvider } from './providers/transaction.provider';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { UserEntity } from './entities/user.entity';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                const database = config.get<DatabaseConfig>('database')
                return {
                    type: 'postgres',
                    host: database.host,
                    port: database.port,
                    username: database.user,
                    password: database.password,
                    database: database.name,
                    entities: [
                        ProductEntity, 
                        CategoryEntity,
                        UserEntity
                    ],
                    synchronize: false,
                    logging: ['query']
                }
            },
            inject: [ConfigService],
        })
    ],
    providers: [
        TransactionProvider
    ],
    exports: [
        TransactionProvider
    ]
})
export class ShopyDatabaseModule {}
