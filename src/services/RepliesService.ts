import { Repository } from "typeorm";
import { Replies } from "../entity/Replies";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { RepliesValidator } from "../utils/validator/CircleAppValidator";

class RepliesService {
    private readonly RepliesRepository:Repository<Replies> = 
    AppDataSource.getRepository(Replies)

    async create (req : Request, res: Response) {
        try {
            const {data}= req.body
            const {error, value} = RepliesValidator.validate(data)
            if(error) return res.status(400).json({message : error.details[0].message})

            const response = await this.RepliesRepository.save(value)

            return res.status(200).json({message: "Replies Created !!" , response})
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }


    async find (req: Request, res: Response) {
        try {
            const threads = await this.RepliesRepository.find();
            return res.status(200).json(Replies)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }

    async findById (req: Request, res: Response) {
        try {
            const id = req.params.id
            const find = await this.RepliesRepository.findOne({
                where: {
                    id:Number(id)
                }
            });

            if(!find) {
                return res.status(404).send({error : "Replies not found !"})
            }

            return res.status(200).json(find)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }

    async update (req: Request, res: Response) {
        try {
            const {content,image} = req.body
            const id = req.params.id

            const threads = await this.RepliesRepository.findOne({
                where: {
                    id : Number(id),
                },
            })

            if (!threads) {
                return res.status(404).send({error : "Replies not found !"})
            }
            if(image != '') {
                threads.image = image
            }
        
            if(content != '') {
                threads.content = content
            }
            
            const response = await this.RepliesRepository.save(threads)

            return res.status(200).json({message:"Replies Updated!" ,response})
        } catch (error) {
            return res.status(500).json({error : error})
        }
    }

    async delete (req: Request, res: Response) {
        try {
            const id = req.params.id

            const threads = await this.RepliesRepository.findOne({
                where: {
                    id : Number(id),
                },
            })

            if (!threads) {
                return res.status(404).send({error : "Replies not found !"})
            }
      
            const response = await this.RepliesRepository.delete({id:Number (id)})

            return res.status(200).json({message:"Success Delete Data!"})
        } catch (error) {
            return res.status(500).json({error : error})
        }
    }
}

export default new RepliesService()