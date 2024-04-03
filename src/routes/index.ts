import * as express from "express"
import ThreadsControllers from "../controllers/ThreadsControllers"
import UserController from "../controllers/UserController"
import RepliesController from "../controllers/RepliesController"
import AuthController from "../controllers/AuthController"
import AuthenticationMiddleware from "../middlewares/Auth"

const Route = express.Router()



    // Threads
    Route.get("/threads" , ThreadsControllers.find)
    Route.get("/threads/:id" , ThreadsControllers.findById)
    Route.post("/threads" ,  AuthenticationMiddleware.Auth, ThreadsControllers.create)
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
    Route.get("/threads/:id/replies" , RepliesController.repliesByThreadId)
    Route.post("/replies" , AuthenticationMiddleware.Auth, RepliesController.create)
    Route.patch("/replies/:id" , RepliesController.update)
    Route.delete("/replies/:id" , RepliesController.delete)

    // Register
    Route.post("/auth/register", AuthController.register)
    Route.post("/auth/login", AuthController.login)
    Route.get("/auth/check", AuthenticationMiddleware.Auth, AuthController.check)


export default Route