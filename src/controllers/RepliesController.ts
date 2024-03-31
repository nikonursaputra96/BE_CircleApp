import { Request, Response } from "express";
import RepliesService from "../services/RepliesService";

class RepliesController {
    create(req: Request, res: Response) {
        RepliesService.create (req,res)
    }

    find(req: Request, res: Response) {
        RepliesService.find(req, res)
    }
    update(req: Request, res: Response) {
        RepliesService.update(req, res)
    }

    findById(req: Request, res: Response) {
        RepliesService.findById(req, res)
    }
    delete(req: Request, res: Response) {
        RepliesService.delete(req, res)
    }
    
}

export default new RepliesController()