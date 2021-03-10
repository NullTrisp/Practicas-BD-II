import { Request, Response } from "express";
import { PostModel } from "../models/Post";
import { UserModel } from "../models/User";

export class PostController {
  public create(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    UserModel.updateOne(
      { username: req.params.username },
      {
        posts: new PostModel({
          title: req.body.title,
          content: req.body.content,
        }),
      }
    )
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  }

  public read(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Not implemented");
  }

  public readAll(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    UserModel.find({}, (err, users) => {
      err
        ? res.status(500).send(err)
        : users.length > 0
        ? res.status(200).send(users)
        : res.sendStatus(404);
    });
  }

  public update(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Not implemented");
  }

  public delete(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Not implemented");
  }
}
