import { Request, Response } from "express";
import { UserModel } from "../models/User";

export class FriendsController {
  public async add(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const user: any = await UserModel.findOne({
        username: req.params.username,
      });

      const userToFollow: any = await UserModel.findOne({
        username: req.params.follow,
      });

      if (user && userToFollow) {
        user.friends.push(userToFollow.username);
        await UserModel.updateOne(
          { username: req.params.username },
          {
            friends: user.friends,
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

  public async readToAdd(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const user: any = await UserModel.findOne({
        username: req.params.username,
      });

      const users = await UserModel.find({
        $and: [
          { username: { $not: { $in: user.friends } } },
          { username: { $ne: user.username } },
        ],
      });

      res.status(200).send(users);
    } catch (err) {
      console.log(err);

      res.status(500).send(err);
    }
  }

  public async readFriends(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const user: any = await UserModel.findOne({
        username: req.params.username,
      });

      res.status(200).send(await UserModel.find({ username: user.friends }));
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

      const userToUnfollow: any = await UserModel.findOne({
        username: req.params.user,
      });

      if (user && userToUnfollow) {
        user.friends.splice(user.friends.indexOf(userToUnfollow.username), 1);
        await UserModel.updateOne(
          { username: req.params.username },
          {
            friends: user.friends,
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
