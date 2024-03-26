import { Repository } from "typeorm";
import { Threads } from "../entity/Threads";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { ThreadsValidator } from "../utils/validator/ThreadsValidator";
import { IThreads } from "../interfaces/ThreadsInterfaces";

class ThreadsService {
    private readonly threadsRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads)

    async create (req : Request, res: Response) {
        try {
            const {content,image,userId}:IThreads = req.body
            const {error, value} = ThreadsValidator.validate({content, image,userId})
            if(error) return res.status(400).json({message : error.details[0].message})

            const response = await this.threadsRepository.save(value)

            return res.status(200).json({message: "Threads Created !!" , response})
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }


    async find (req: Request, res: Response) {
        try {
            const threads = await this.threadsRepository.find();
            return res.status(200).json(threads)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }

    async findById (req: Request, res: Response) {
        try {
            const id = req.params.id
            const find = await this.threadsRepository.findOne({
                where: {
                    id:Number(id)
                }
            });
            return res.status(200).json(find)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }

    async update (req: Request, res: Response) {
        try {
            const {content,image}:IThreads = req.body
            const id = req.params.id

            const threads = await this.threadsRepository.findOne({
                where: {
                    id : Number(id),
                },
            })

            if (!threads) {
                return res.status(404).send({error : "Thread not found !"})
            }
            if(image != '') {
                threads.image = image
            }
        
            if(content != '') {
                threads.content = content
            }
            
            const response = await this.threadsRepository.save(threads)

            return res.status(200).json({message:"Threads Updated!" ,response})
        } catch (error) {
            return res.status(500).json({error : error})
        }
    }

    async delete (req: Request, res: Response) {
        try {
            const id = req.params.id

            const threads = await this.threadsRepository.findOne({
                where: {
                    id : Number(id),
                },
            })

            if (!threads) {
                return res.status(404).send({error : "Thread not found !"})
            }
      
            const response = await this.threadsRepository.delete({id:Number (id)})

            return res.status(200).json({message:"Success Delete Data!"})
        } catch (error) {
            return res.status(500).json({error : error})
        }
    }

   
}

export default new ThreadsService()