import * as amqp from "amqplib"
import {v2 as cloudinary} from "cloudinary"
import { AppDataSource } from "../data-source"
import { Threads } from "../entity/Threads"
import { Repository } from "typeorm"
import axios from "axios";

class ThreadWorker {
    private readonly threadsRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads)


    async create () {
        try {
            const connection = await amqp.connect("amqp://localhost")
            const channel = await connection.createChannel()
            await channel.assertQueue("thread")
            

            await channel.consume("thread", async (message) => {
                try {

                    const payload = JSON.parse(message.content.toString())
                    
                    let imageURL: string | undefined

                    if (payload.image) {
                        const cloudinaryResponse = await cloudinary.uploader.upload("src/assets/" + payload.image)
                        const imageURL = cloudinaryResponse.secure_url
                    }
    
                    const thread = this.threadsRepository.create({
                        content: payload.value.content,
                        image: imageURL  ,
                        user: {id: payload.loginSession.id}
                    });
                    await this.threadsRepository.save(thread)
                    
                    console.log("Thread Created! : ", payload)

                    // Connection SSE route
                     const sendGetRequest = async () => {
                        try {
                            const response = await axios.get("http://localhost:5000/api/v1/new-thread");
                            console.log("Response data:", response.data);
                        } catch (error) {
                            console.error("Error sending request:", error);
                        }
                    }
                    
                    sendGetRequest();

                    channel.ack(message)
                } catch(error) {
                    console.error("Error processing message:", error)
                }
            })
        } catch (error) {
            console.error("Error in Create Threads",error)
        }
    }
}

export default new ThreadWorker()