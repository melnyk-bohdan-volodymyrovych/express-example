import express, {NextFunction, Request, Response} from 'express';
import * as bodyParser from "body-parser";

import {ConfigProvider} from "@/config";
import {authRouter} from "@/auth";
import {SwaggerModule} from "@/swagger";
import {booksRouter} from "@/books";

const app = express();
const port = ConfigProvider.port;

// App setup
app.use(bodyParser.urlencoded({extended: true}))

// Routers
app.use('/auth', authRouter);
app.use('/books', booksRouter);

// Documentation
SwaggerModule.injectInto(app);

// Global error handler
app.use( ( err : Error | any, request : Request , response : Response , next : NextFunction ) => {
    // 200
    if(err.name === 'PrismaClientKnownRequestError' && err.meta.cause === 'Record to update not found.')
        return response.status(204).send('Record to update not found.');

    // 400
    if(err.name === 'BodyParsingError') return response
        .status( 400 )
        .send( `${err.name}: ${err.message}` );

    //500
    response.status( 500 ).send( 'OOPS! Something went wrong!' );
    console.log( err.stack );
} );

// App init
app.listen(port, () => {
    console.info(`API    : http://localhost:${port}`);
    console.info(`SWAGGER: http://localhost:${port}/api-docs`)
});
