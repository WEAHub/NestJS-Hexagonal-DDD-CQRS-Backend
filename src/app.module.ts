import { Module } from '@nestjs/common'
import { CoreModule } from '@core/core.module'
import { ConfigLoaderModule } from 'src/config/config.module'

@Module({
    imports: [ConfigLoaderModule, CoreModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
