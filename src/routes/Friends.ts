import express, { Request, Response } from "express";
import { FriendsController } from "../controllers/Friends";

const friendsController = new FriendsController();

export const friendsRouter = express.Router({
  strict: true,
});

friendsRouter.post("/", (req: Request, res: Response) => {
  friendsController.add(req, res);
});

friendsRouter.get("/", (req: Request, res: Response) => {
  friendsController.read(req, res);
});

friendsRouter.delete("/", (req: Request, res: Response) => {
  friendsController.delete(req, res);
});
