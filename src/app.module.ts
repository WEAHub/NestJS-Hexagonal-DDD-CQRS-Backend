import { Module } from '@nestjs/common'
import { CoreModule } from '@core/core.module'
import { ConfigLoaderModule } from '@config/config.module'
import { ShopyDatabaseModule } from '@persistance/shopy-database/shopy-database.module'

@Module({
    imports: [ConfigLoaderModule, CoreModule, ShopyDatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
