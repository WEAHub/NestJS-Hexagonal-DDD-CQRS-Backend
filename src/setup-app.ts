import { ServerConfig } from '@config/server.config'
import { generateSwaggerDocs } from 'src/utils/generate-swagger-docs'
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
