import { AppDataSource } from "./data-source"
import * as express from "express"
import { Request, Response } from "express"
import ThreadsControllers from "./controllers/ThreadsControllers"

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    const router = express.Router()

    app.use(express.json())
    app.use("/api/v1", router)

    app.get("/", (req : Request, res: Response) => {
        res.send('Hello World')
    })
    router.get("/", (req : Request, res: Response) => {
        res.send('Hello World V1')
    })

    // Threads
    router.get("/threads" , ThreadsControllers.find)
    router.get("/threads/:id" , ThreadsControllers.findById)
    router.post("/threads" , ThreadsControllers.create)
    router.patch("/threads/:id" , ThreadsControllers.update)
    router.delete("/threads/:id" , ThreadsControllers.delete)

    app.listen (port, () => {
        console.log(`Server Success on port ${port}`)
    })

}).catch(error => console.log(error))
