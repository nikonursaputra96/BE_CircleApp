import { Request, Response } from "express";
import ThreadsService from "../services/ThreadsService";

class ThreadsControllers {
    create(req: Request, res: Response) {
        ThreadsService.create (req,res)
    }

    find(req: Request, res: Response) {
        ThreadsService.find(req, res)
    }
    update(req: Request, res: Response) {
        ThreadsService.update(req, res)
    }

    findById(req: Request, res: Response) {
        ThreadsService.findById(req, res)
    }
    delete(req: Request, res: Response) {
        ThreadsService.delete(req, res)
    }
    
}

export default new ThreadsControllers()