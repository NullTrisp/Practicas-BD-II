import { Request, Response } from "express";
import { AddressModel } from "../models/Adress";
import { UserModel } from "../models/User";

export class UserController {
  public async create(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      await new UserModel({
        ...req.body,
        address: req.body.address,
      }).save();
      res.sendStatus(201);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async login(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const user = await UserModel.findOne({
        username: req.body.username,
        password: req.body.password,
      });
      user ? res.status(200).send(user) : res.sendStatus(404);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async read(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const user = await UserModel.findOne({ username: req.params.username });
      user ? res.status(200).send(user) : res.sendStatus(404);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async readAll(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const users = await UserModel.find({});
      users.length > 0 ? res.status(200).send(users) : res.sendStatus(404);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async update(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      await UserModel.findOneAndUpdate(
        { username: req.params.username },
        req.body
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);

      res.status(500).send(err);
    }
  }

  public async delete(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      await UserModel.findOneAndRemove({ username: req.params.username });
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
