import express, { Request, Response } from "express";
import { FriendsController } from "../controllers/Friends";

const friendsController = new FriendsController();

export const friendsRouter = express.Router({
  strict: true,
});

friendsRouter.post("/:username/add/:follow", (req: Request, res: Response) => {
  friendsController.add(req, res);
});

friendsRouter.get("/:username", (req: Request, res: Response) => {
  friendsController.readFriends(req, res);
});

friendsRouter.get("/find/:username", (req: Request, res: Response) => {
  friendsController.readToAdd(req, res);
});

friendsRouter.delete("/", (req: Request, res: Response) => {
  friendsController.delete(req, res);
});
