import {NextFunction, Request, Response} from "express";
import {JwtAuthStrategy} from "./jwt-auth.strategy";


export const authGuard = (authStrategyConstructor: {new (): JwtAuthStrategy}) =>
    ({headers}: Request, res: Response, next: NextFunction) => {
    const authStrategy = new authStrategyConstructor();
        authStrategy
            .verify(headers?.authorization)
            .then(() => next())
            .catch(err => {
                if (err.name === 'JsonWebTokenError')
                    return res.status(401).send('Unauthorized')
                    res.render('Unauthorized', err)
                next(err)
            });
}
