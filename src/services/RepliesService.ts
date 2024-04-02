import { Repository } from "typeorm";
import { Replies } from "../entity/Replies";
import { AppDataSource } from "../data-source";
import { IReply } from "../interfaces/CircleAppInterface";

class RepliesService {
    private readonly RepliesRepository:Repository<Replies> = 
    AppDataSource.getRepository(Replies)

    async create (reqBody:IReply) : Promise<Replies> {
        try {
            const newReply = this.RepliesRepository.create({
                content: reqBody.content,
                image: reqBody.image,
                user: {id: reqBody.userId},
                threads: {id: reqBody.threadsId}
            })

    
            const response = await this.RepliesRepository.save(newReply)

            return response
          
        } catch (error) {
            throw error
        }
    }


    async find () : Promise<IReply[]> {
        try {
            const data = await this.RepliesRepository.find({
                relations: ['user', 'threads'],
                order: {
                    id: 'DESC'
                }
            })

            return data
        } catch (error) {
           throw error
        }
    }

    async findById (id: number) {
        try {
            const find = await this.RepliesRepository.findOne({where: {id:Number(id)}});

            if(!find) {
                throw new Error("Replies not found !")
            }

            return find
        } catch (error) {
            throw error
        }
    }

    async update (reqBody: IReply, id:number) {
        try {
            const data = await this.RepliesRepository.findOne({where: {id:Number(id)}});
            const {content,image} = reqBody

            if (!data) throw new Error ( "Replies not found !")
            if(image != '') data.image = image
            if(content != '') data.content = content
            
            const update = await this.RepliesRepository.save(data)

            return update
        } catch (error) {
            throw error
        }
    }

    async delete (id:number) {
        try {
            const data = await this.RepliesRepository.findOne({where: {id:Number(id)}});
            if (!data) throw new Error ("Replies not found !")

            const response = await this.RepliesRepository.delete(data)

            return response
        } catch (error) {
            throw error
        }
    }

    async repliesByThreadId  (threadId:number, limit: number = 25): Promise<IReply[]>  {
        try {
            const replies = await this.RepliesRepository.find({
                where: {threads: {id: threadId}},
                relations: ['user', 'threads'],
                order: {posted_at : 'DESC'},
                take: limit
            })

            return replies
        } catch (error) {
            throw error
        }
    }
}

export default new RepliesService()