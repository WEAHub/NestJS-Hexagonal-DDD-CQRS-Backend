import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfig } from '@config/database.config'

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
                    synchronize: false,
                    autoLoadEntities: true,
                    //logging: ['query'],
                }
            },
            inject: [ConfigService],
        }),
    ],
})
export class ShopyDatabaseModule {}
