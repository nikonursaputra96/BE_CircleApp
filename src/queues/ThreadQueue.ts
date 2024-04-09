import { Request, Response } from "express";
import * as amqp from "amqplib"
import rabbitmq from "../libs/rabbitmq";
import { ThreadsValidator } from "../utils/validator/CircleAppValidator";


class ThreadQueue {
    async create (req:Request, res:Response) {
        try {
            const image = res.locals.filename
            const dataThreads =  req.body
            const loginSession = res.locals.loginSession
            const {error, value} = ThreadsValidator.validate(dataThreads)
            if(error) return res.status(400).json({message : error.details[0].message})
              
            const payload = {value, image, loginSession}
            rabbitmq.sendToQueue("thread", JSON.stringify(payload))

            res.status(200).json({message : "Thread Created Successfully!"})
        } catch (error) {
   
            res.status(500).json({error: 'Somethin when wrong in the server!'})
        }
    }
}

export default new ThreadQueue()