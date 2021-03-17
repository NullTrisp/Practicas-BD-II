import { Request, Response } from "express";
import { PostModel } from "../models/Post";
import { UserModel } from "../models/User";

function stringToHash(string: string): string {
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
      const user: any = await UserModel.findOne({
        username: req.params.username,
      });
      if (user) {
        user.posts.push(
          new PostModel({
            hash:
              stringToHash(req.params.username) +
              "_" +
              stringToHash(req.body.title) +
              "_" +
              Date.now(),
            ...req.body,
          })
        );
        await UserModel.updateOne(
          { username: req.params.username },
          {
            posts: user.posts,
          }
        );
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
      const user: any = await UserModel.findOne({
        username: req.params.username,
      });
      user ? res.status(200).send(user.posts) : res.sendStatus(404);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async update(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const user: any = await UserModel.findOne({
        username: req.params.username,
      });
      const userPosts: object[] = user.posts;
      const i = userPosts.findIndex((x: any) => x.hash === req.params.hash);
      if (i > -1) {
        userPosts[i] = {
          hash: req.params.hash,
          title: req.body.title,
          content: req.body.content,
        };
        await UserModel.updateOne(
          { username: req.params.username },
          {
            posts: userPosts,
          }
        );
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async delete(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const user: any = await UserModel.findOne({
        username: req.params.username,
      });
      const userPosts: object[] = user.posts;
      const i = userPosts.findIndex((x: any) => x.hash === req.params.hash);
      if (i > -1) {
        userPosts.splice(i, 1);
        await UserModel.updateOne(
          { username: req.params.username },
          {
            posts: userPosts,
          }
        );
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
