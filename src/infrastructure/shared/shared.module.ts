import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import databaseConfig from "./config/database.config";
import serverConfig from "./config/server.config";
import tokenConfig from "./config/token.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            load: [
                databaseConfig,
                serverConfig,
                tokenConfig
            ],
            validationSchema: Joi.object({
                SERVER_PORT: Joi.number().default(3000),
                DATABASE_HOST: Joi.string().default('localhost'),
                DATABASE_PORT: Joi.number().default(5432),
                DATABASE_NAME: Joi.string().required(),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                TOKEN_ACCESS_KEY: Joi.string().required(),
                TOKEN_ACCESS_EXPIRATION: Joi.string().required(),
                TOKEN_REFRESH_KEY: Joi.string().required(),
                TOKEN_REFRESH_EXPIRATION: Joi.string().required()
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: false,
            },
        })
    ]
})
export class SharedModule {

}