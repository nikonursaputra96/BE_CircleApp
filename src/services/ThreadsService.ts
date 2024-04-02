import { Repository } from "typeorm";
import { Threads } from "../entity/Threads";
import { AppDataSource } from "../data-source";
import { IThreads } from "../interfaces/CircleAppInterface";
import * as path from 'path'

class ThreadsService {
    private readonly threadsRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads)

    async create (reqBody:IThreads, imageFile: Express.Multer.File): Promise<Threads> {
        try {

            const imagePath = imageFile ?  imageFile.filename : ''
            const newThread = this.threadsRepository.create({
                content: reqBody.content,
                image: imagePath,
                user: {id: reqBody.userId}
            });
            const response = await this.threadsRepository.save(newThread)
      
            return response
        } catch (error) {
             throw error
        }
    }


    async find () {
        try {
            const data = await this.threadsRepository.find({ 
                relations: ['user'] ,
                order: {
                    id: 'DESC'
                }
            });
            return data
        } catch (error) {
            throw error
        }
    }

    async findById (id:number) {
        try {
            const find = await this.threadsRepository.findOne({where: {id:Number(id)}});
            
            if(!find) {
                throw new Error('Threads npt found!')
            }

            return find
        } catch (error) {
            throw error
        }
    }

    async update (reqBody:IThreads, id:number) {
        try {
            const threads = await this.threadsRepository.findOne({where: {id:Number(id)}})
            const {content, image} = reqBody

            if (!threads) throw new Error ('Threads not found!')
            if(image != '')  threads.image = image
            if(content != '') threads.content = content
            const response = await this.threadsRepository.save(threads)

            const update = await this.threadsRepository.save(threads)
            return update
        } catch (error) {
            throw error
        }
    }

    async delete (id:number) {
        try {
            const threads = await this.threadsRepository.findOne({where: {id : Number(id)}})
            if (!threads)  throw new Error ("Thread not found !")
      
            const deleteThreads = await this.threadsRepository.delete(threads)

            return deleteThreads
        } catch (error) {
            throw error
        }
    }

   
}

export default new ThreadsService()