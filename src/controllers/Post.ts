import { Request, Response } from "express";
import { PostModel } from "../models/Post";
import { UserModel } from "../models/User";

export function stringToHash(string: string): string {
  let hash = 0;

  if (string.length == 0) return hash.toString();

  for (let i: number = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash.toString();
}

export class PostController {
  public async create(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      if (
        await UserModel.findOne({
          username: req.params.username,
        })
      ) {
        await new PostModel({
          username: req.params.username,
          hash:
            stringToHash(req.params.username) +
            "_" +
            stringToHash(req.body.title) +
            "_" +
            Date.now(),
          ...req.body,
          created_at: Date.now(),
        }).save();
        res.sendStatus(201);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async read(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const user: any = await UserModel.findOne({
        username: req.params.username,
      });
      const userPosts: object[] = user.posts;
      const i = userPosts.findIndex((x: any) => x.hash === req.params.hash);
      i > -1 ? res.status(200).send(userPosts[i]) : res.sendStatus(404);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async readAll(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const posts = await PostModel.find({ username: req.params.username });

      posts.length > 0 ? res.status(200).send(posts) : res.sendStatus(404);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async update(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const post = await PostModel.findOneAndUpdate(
        {
          username: req.params.username,
          hash: req.params.hash,
        },
        {
          title: req.body.title,
          content: req.body.content,
        }
      );
      post ? res.sendStatus(200) : res.sendStatus(404);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async delete(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const post = await PostModel.findOneAndDelete({
        username: req.params.username,
        hash: req.params.hash,
      });
      post ? res.sendStatus(200) : res.sendStatus(404);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
