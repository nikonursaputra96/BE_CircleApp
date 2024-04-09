import { AppDataSource } from "./data-source"
import * as express from "express"
import { Request, Response } from "express"
import * as cors from "cors"
import Route from "./routes"
import * as path from 'path'
import workers from "./workers"
import EventEmitter = require("events")


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

// SSE (Server Sent Event)
    const eventEmitter = new EventEmitter();

    Route.get("/notifications", (req: Request, res: Response) => {
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Connection", "keep-alive");

      eventEmitter.on("message", (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      });
    });

    Route.get("/new-thread", (req: Request, res: Response) => {
      const newThread = { message: "New thread!" };

      eventEmitter.emit("message", newThread);

      res.sendStatus(200);
    });

// ..........................................

    app.listen (port, () => {
        console.log(`Server Success on port ${port}`)
    })

    workers

}).catch(error => console.log(error))
