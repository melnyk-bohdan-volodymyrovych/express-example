import express, {Router, Request, Response} from "express";
import swaggerJsdoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

import {resolve} from "path";
import {ConfigProvider} from "@/config";


export class SwaggerModule {
    static injectInto(target: Router ) {
        const swaggerDefinition = {
            swagger: '2.0',
            info: {
                title: 'Books API',
                version: '1.0.0',
                description: 'Створіть REST API для керування списком книг, де доступ до ендпойнтів обмежений за допомогою токенів доступу, які видаються на 2 години.',
            },
            host: `localhost:${ConfigProvider.port}`,
            securityDefinitions: {
                Bearer: {
                    type: "apiKey",
                    name: "Authorization",
                    in: "header",
                    description: "Get your JWT by hitting GET /auth/"
                }
            }
        };

        const options = {
            swaggerDefinition,
            apis: [`${resolve()}/**/*.router.ts`],
        };
        console.log()
        const swaggerSpec = swaggerJsdoc(options);

        target.get('/api-docs.json', (req, res) => res.send(swaggerSpec))

        target.use('/api-docs', swaggerUi.serve);
        target.get('/api-docs', swaggerUi.setup(swaggerSpec));
    }
}
