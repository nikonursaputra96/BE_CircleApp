import * as express from "express"
import ThreadsControllers from "../controllers/ThreadsControllers"
import UserController from "../controllers/UserController"
import RepliesController from "../controllers/RepliesController"

const Route = express.Router()



    // Threads
    Route.get("/threads" , ThreadsControllers.find)
    Route.get("/threads/:id" , ThreadsControllers.findById)
    Route.post("/threads" , ThreadsControllers.create)
    Route.patch("/threads/:id" , ThreadsControllers.update)
    Route.delete("/threads/:id" , ThreadsControllers.delete)
    // User
    Route.get("/user" , UserController.find)
    Route.get("/user/:id" , UserController.findById)
    Route.post("/user" , UserController.create)
    Route.patch("/user/:id" , UserController.update)
    Route.delete("/user/:id" , UserController.delete)
    // Replies
    Route.get("/replies" , RepliesController.find)
    Route.get("/replies/:id" , RepliesController.findById)
    Route.post("/replies" , RepliesController.create)
    Route.patch("/replies/:id" , RepliesController.update)
    Route.delete("/replies/:id" , RepliesController.delete)


export default Route