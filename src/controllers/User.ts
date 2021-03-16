import { Request, Response } from "express";
import { UserModel } from "../models/User";

export class UserController {
  public create(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    const newUser = new UserModel({
      name: req.body.name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      age: req.body.age,
    });
    newUser.save((err: any) => {
      err ? res.status(500).send(err.message) : res.sendStatus(201);
    });
  }

  public login(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    UserModel.findOne({ username: req.body.username, password: req.body.password })
      .then((user: any) => {
        user ? res.status(200).send({ username: user.username, last_name: user.last_name, name: user.name, posts: user.posts }) : res.sendStatus(404);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  }

  public read(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    UserModel.findOne({ username: req.params.username })
      .then((user: any) => {
        user ? res.status(200).send(user) : res.sendStatus(404);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
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
    UserModel.updateOne(
      { username: req.params.username },
      {
        name: req.body.name,
        last_name: req.body.last_name,
        age: req.body.age,
      }
    )
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  }

  public delete(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    UserModel.deleteOne({ username: req.params.username })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err: any) => {
        res.status(200).send(err);
      });
  }
}
