import {NextFunction, Request, Response, Router} from "express";
import {JwtAuthStrategy} from "./jwt-auth.strategy";



export const authRouter = Router()

const getToken = (authStrategyConstructor: {new (): JwtAuthStrategy}) =>
    (req: Request, res: Response, next: NextFunction) => {
    const authStrategy: JwtAuthStrategy = new authStrategyConstructor();
    res.send({accessToken: authStrategy.createToken()});
};

/**
 * @openapi
 * /auth/:
 *   get:
 *     tags:
 *        - "Auth"
 *     summary:
 *       Get JWT token for Authorization.
 *     responses:
 *       '200':    # status code
 *           description: JWT token
 *           content:
 *             application/json:
 *               schema: json
 */
authRouter.get('/', getToken(JwtAuthStrategy));
