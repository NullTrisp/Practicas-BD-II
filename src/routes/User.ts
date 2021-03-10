import express, { Request, Response } from "express";
import { UserController } from "../controllers/User";

const userController = new UserController();

export const userRouter = express.Router({
  strict: true,
});

userRouter.post("/", (req: Request, res: Response) => {
  userController.create(req, res);
});

userRouter.get("/", (req: Request, res: Response) => {
  userController.readAll(req, res);
});

userRouter.get("/:username", (req: Request, res: Response) => {
    userController.read(req, res);
  });

userRouter.put("/:username", (req: Request, res: Response) => {
  userController.update(req, res);
});

userRouter.delete("/:username", (req: Request, res: Response) => {
  userController.delete(req, res);
});
