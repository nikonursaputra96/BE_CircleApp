import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'


class AuthenticationMiddleware {
    Auth(req: Request, res: Response, next: NextFunction) : Response {
        try {
            const authorizationHeaders = req.headers.authorization
            if(authorizationHeaders || !authorizationHeaders.startsWith("Bearer"))
            return res.status(401).json({message : 'unauthorized / token is not valid'})

            const token = authorizationHeaders.split (" ")[1]
            try {
                res.locals.loginSession = jwt.verify(token, process.env.SECRET_KEY)
                next()
            } catch (error) {
                return res.status(401).json({message : 'Token is wrong!'})
            }
        } catch (error) {
            return res.status(401).json({message : 'Unauthorized!'})
        }
    }
}

export default new AuthenticationMiddleware()