import { Request, Response } from "express";
import { PostModel } from "../models/Post";
import { UserModel } from "../models/User";

function stringToHash(string: string) {
  var hash = 0;

  if (string.length == 0) return hash;

  for (let i: number = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}

export class PostController {
  public create(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    UserModel.findOne({ username: req.params.username })
      .then((user: any) => {
        let posts: Array<object> = user.posts;
        posts.push(
          new PostModel({
            hash: stringToHash(req.body.title),
            ...req.body,
          })
        );
        UserModel.updateOne(
          { username: req.params.username },
          {
            posts: posts,
          }
        )
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err: any) => {
            res.status(500).send(err);
          });
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
    UserModel.findOne({ username: req.params.username })
      .then((user: any) => {
        user ? res.status(200).send(user.posts) : res.sendStatus(404);
      })
      .catch((err: any) => {
        res.status(500).send(err);
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
    UserModel.findOne({ username: req.params.username })
      .then((user: any) => {
        console.log(stringToHash(req.params.title));

        let posts: Array<object> = user.posts;
        const index = user.posts.findIndex(
          (x: any) => x.hash === stringToHash(req.params.title)
        );
        if (index !== undefined) posts.splice(index, 1);
        UserModel.updateOne(
          { username: req.params.username },
          {
            posts: posts,
          }
        )
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err: any) => {
            res.status(500).send(err);
          });
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  }
}
