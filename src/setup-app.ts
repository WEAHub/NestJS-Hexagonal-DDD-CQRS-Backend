import { generateSwaggerDocs } from '@infrastructure/http-server/utils/generate-swagger-docs'
import { ServerConfig } from '@infrastructure/shared/config/server.config'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

const httpMethods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']

export function getServerConfig(app: INestApplication): ServerConfig {
    const config: ConfigService = app.get(ConfigService)
    return config.get<ServerConfig>('server')
}

export const setupApp = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )

    app.enableCors({
        methods: httpMethods.join(','),
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })

    generateSwaggerDocs(app)
}
