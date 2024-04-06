import {sign, decode, JwtPayload} from 'jsonwebtoken';
import {ConfigProvider} from "../config/config.provider";

export class AuthStrategy {
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

   decode(token: string) {
        return decode(token, )
   }
}