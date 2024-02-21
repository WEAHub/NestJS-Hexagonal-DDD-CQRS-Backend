import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { getServerConfig, setupApp } from './setup-app'
import { ServerConfig } from '@infrastructure/shared/config/server.config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config: ServerConfig = getServerConfig(app)
    setupApp(app)
    await app.listen(config.port)
}
bootstrap()
