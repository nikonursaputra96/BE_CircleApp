import { Request, Response } from "express";
import UserService from "../services/UserService";
import { UserValidator } from "../utils/validator/CircleAppValidator";
import { IUser } from "../interfaces/CircleAppInterface";

class UserController {
    async create(req: Request, res: Response) {
        try {
            const dataUser = req.body
            const {error, value} = UserValidator.validate(dataUser)

            if (error) return res.status(400).json({message: error.details[0].message})

            const response = await UserService.create(value)
            return res.status(200).json({message: "User Created !!" , response})
        } catch (error) {
            return res.status(500).json({message: error})
        }
        
    }

    async find(req: Request, res: Response) {
        try {
            const user = await UserService.find()
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({message: error})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const data:IUser = req.body
            const updateData = await UserService.update(id,data)
            return res.status(200).json(updateData)
        } catch (error) {
            return res.status(500).json({message : error})
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const user = await UserService.findById(id)
            return res.status(200).json({message : 'User Found!', user})
        } catch (error) {

        return res.status(500).json({message : error})
        }
    }
    
    async delete(req: Request, res: Response) {
       try {
        const id = Number(req.params.id)
        const user = await UserService.delete(id)
        return res.status(200).json({message : 'User Delete!'})
       } catch (error) {
        return res.status(500).json({message : error})
       }
    }
    
}

export default new UserController()