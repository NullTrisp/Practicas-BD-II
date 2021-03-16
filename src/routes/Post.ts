import express, { Request, Response } from "express";
import { PostController } from "../controllers/Post";

const postController = new PostController();

export const postRouter = express.Router({
  strict: true,
});

postRouter.post("/:username", (req: Request, res: Response) => {
  postController.create(req, res);
});

postRouter.get("/:username", (req: Request, res: Response) => {
  postController.readAll(req, res);
});

postRouter.get("/:username/:title", (req: Request, res: Response) => {
  postController.read(req, res);
});

postRouter.put("/:username", (req: Request, res: Response) => {
  postController.update(req, res);
});

postRouter.delete("/:username/:title", (req: Request, res: Response) => {
  postController.delete(req, res);
});
