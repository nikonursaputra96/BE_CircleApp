import { AppDataSource } from "../data-source"
import ThreadWorker from "./ThreadWorker"
import cloudinary from "../libs/cloudinary";

class Worker {
    constructor () {

        AppDataSource.initialize().then(async () => {
           cloudinary.config();
            
           await Promise.all([
            ThreadWorker.create()
           ])
        })
        .catch(error => console.error(error))
    }
    
}

export default new Worker()