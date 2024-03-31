import { Request, Response } from "express";
import ThreadsService from "../services/ThreadsService";
import { ThreadsValidator, UserValidator } from "../utils/validator/CircleAppValidator";
import { IThreads } from "../interfaces/CircleAppInterface";
import { uploadImage } from "../utils/validator/upload";

class ThreadsControllers {
    async create(req: Request, res: Response) {
        try {
            uploadImage.single('image')(req, res, async (err:any) => {
            const dataThreads = req.body
            const {error, value} = ThreadsValidator.validate(dataThreads)
            if(error) return res.status(400).json({message : error.details[0].message})
                if (err) {
                    return res.status(500).json({message: 'failed upload image'})
                }


                const response = await ThreadsService.create(value, req.file)
 
                return res.status(200).json({message : 'Threads Created!',response})
            })


        } catch (error) {
            return res.status(500).json({message: error})
        }
    }

    async find(req: Request, res: Response) {
        try {
            const threads = await ThreadsService.find()
            return res.status(200).json(threads)
        } catch (error ) {
            return res.status(500).json({message: error})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const data:IThreads = req.body
            const updateThreads = await ThreadsService.update(data, id)

            return res.status(200).json(updateThreads)
        } catch (error ) {
            return res.status(500).json({message: error})
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const find = await ThreadsService.findById(id)
            return res.status(200).json({message: 'Threads find!', find})
        } catch (error ) {
            return res.status(500).json({message: error})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const deleteThreads = await ThreadsService.delete(id)
            return res.status(200).json({message : 'Threads Deleted!'})
        } catch (error ) {
            return res.status(500).json({message: error})
        }
    }
    
}

export default new ThreadsControllers()