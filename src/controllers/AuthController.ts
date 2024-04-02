import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../utils/validator/CircleAppValidator";
import AuthService from "../services/AuthService";
import * as bcrypt from 'bcrypt'
import UserService from "../services/UserService";
import * as jwt from 'jsonwebtoken';

class AuthController {
    async register (req:Request, res: Response) : Promise<Response> {
        try {
            const data = req.body
            const {error, value} = registerSchema.validate(data)
            if (error) return res.status(422).json({message : error.details[0].message})
            
            const hashPassword = await bcrypt.hash(value.password, 10)
            value.password = hashPassword

            const response = await AuthService.register(value)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({message : error})
        }
    }

    async login( req: Request, res: Response) : Promise<Response> {
        try {
            const data = req.body
            const {error, value} = loginSchema.validate(data)
            if (error) return res.status(422).json({message : error.details[0].message})

            const getUser = await UserService.getUser(value.email)
            if(!getUser) return res.status(400).json({message : 'Your email is not registered!'})

            const isCheckPassword = await bcrypt.compare(value.password, getUser.password)
            if(!isCheckPassword) return res.status(400).json({message : 'Incorrect Password!'})


            const user = {
                id : getUser.id,
                username: getUser.username,
                fullname : getUser.fullname,
                email : getUser.email
            }

            const token = jwt.sign(user, process.env.SECRET_KEY , {expiresIn: '1h'})

            return res.status(200).json({data: user, token})
        } catch (error) {
            return res.status(500).json({message : error})
        }
    }

    async check(req: Request, res: Response ) : Promise<Response> {
        try {
            const loginSession = res.locals.loginSession
            const response = await AuthService.check(loginSession)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default new AuthController()