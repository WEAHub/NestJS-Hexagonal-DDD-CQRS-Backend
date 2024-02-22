import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfig } from '@config/database.config'
import { UserEntity } from '@core/user/infrastructure/adapters/secondary/db/entities/user.entity'

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
                    entities: [UserEntity],
                    synchronize: false,
                    logging: ['query'],
                }
            },
            inject: [ConfigService],
        }),
    ],
})
export class ShopyDatabaseModule {}
