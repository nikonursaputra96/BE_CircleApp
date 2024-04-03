import { Request, Response } from "express";
import RepliesService from "../services/RepliesService";
import { RepliesValidator } from "../utils/validator/CircleAppValidator"
import { IReply } from "../interfaces/CircleAppInterface";

class RepliesController {
    async create(req: Request, res: Response) {
        try {
            const dataReply = req.body
    

            const {error, value} = RepliesValidator.validate(dataReply)
            if(error) return res.status(400).json({message : error.details[0].message})
    
            const response = await RepliesService.create(value)
            return res.status(200).json({message : 'Reply Send', response})
        } catch (error) {
            return res.status(500).json({message: error})
        }

    }

   async find(req: Request, res: Response) {
        try {
            const reply = await RepliesService.find()
            return res.status(200).json(reply)
        } catch (error) {
            return res.status(500).json({message: error})
        }

    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const data:IReply = req.body
            const updateReply = await RepliesService.update(data, id)

            return res.status(200).json(updateReply)
        } catch (error ) {
            return res.status(500).json({message: error})
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const find = await RepliesService.findById(id)
            return res.status(200).json({message: 'Reply find!', find})
        } catch (error ) {
            return res.status(500).json({message: error})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            await RepliesService.delete(id)
            return res.status(200).json({message : 'Reply Deleted!'})
        } catch (error ) {
            return res.status(500).json({message: error})
        }
    }

    async repliesByThreadId (req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const limit = Number(req.query.limit ?? '25')
            const response = await RepliesService.repliesByThreadId(id, limit)

            return res.status(200).json(response)

        } catch (error) {
            return res.status(500).json({message: error})
        }
    }
    
}

export default new RepliesController()