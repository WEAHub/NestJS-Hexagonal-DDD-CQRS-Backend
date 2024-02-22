import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function generateSwaggerDocs(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Shopy Backend')
        .setDescription('Hexagonal + DDD + CQRS Backend Skeleton')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api-docs', app, document)
}
