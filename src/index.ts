import { AppDataSource } from "./data-source"
import * as express from "express"
import { Request, Response } from "express"
import * as cors from "cors"
import Route from "./routes"
import * as path from 'path'


AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000


    const corsConfig: object = {
        "origin" : "*",
        "methods" : "GET, HEAD, PUT, PATCH, DELETE, POST",
        "preflightContinue" : false,
        "optionsSuccessStatus" : 204,
    }


    app.use(cors(corsConfig))


    app.use(express.json())
    app.use("/api/v1", Route)

    app.use('/api/v1/src/assets/', express.static(path.join(__dirname, 'assets')))

    app.get("/", (req : Request, res: Response) => {
        res.send('Hello World')
    })
    Route.get("/", (req : Request, res: Response) => {
        res.send('Hello World V1')
    })

    app.listen (port, () => {
        console.log(`Server Success on port ${port}`)
    })

}).catch(error => console.log(error))
