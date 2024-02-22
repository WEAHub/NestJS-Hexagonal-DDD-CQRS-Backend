import { Module } from '@nestjs/common'
import { ShopyDatabaseModule } from './shopy-database/shopy-database.module'

@Module({
    imports: [ShopyDatabaseModule],
    exports: [ShopyDatabaseModule],
})
export class PersistenceModule {}
