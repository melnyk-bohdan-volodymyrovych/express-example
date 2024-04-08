import express, { Request, Response } from 'express';
import * as bodyParser from "body-parser";

import {ConfigProvider} from "./config";
import {authRouter} from "./auth";
import {SwaggerModule} from "./swagger";
import {booksRouter} from "./books";


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
app.use( ( err : Error , request : express.Request , response : express.Response , next : express.NextFunction ) => {
    response.status( 500 ).send( "Something went wrong!" );
    console.log( err.stack );
} );

// App init
app.listen(port, () => {
    console.info(`API    : http://localhost:${port}`);
    console.info(`SWAGGER: http://localhost:${port}/api-docs`)
});
