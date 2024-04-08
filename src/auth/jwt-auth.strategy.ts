import {JsonWebTokenError, sign, verify} from 'jsonwebtoken';
import {ConfigProvider} from "../config/config.provider";

export class JwtAuthStrategy {
    constructor() {}

   createToken() {
       return sign(
           { creationDate: Date.now().toString() },
           ConfigProvider.jwtSecret,
           {
               expiresIn: ConfigProvider.jwtTtl,
           }
       );
   }

   async verify(token?: string) {
        return verify(token, ConfigProvider.jwtSecret);
   }
}