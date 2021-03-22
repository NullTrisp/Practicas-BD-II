import { Request, Response } from "express";
import { PostModel } from "../models/Post";
import { UserModel } from "../models/User";

export class AnalyticsController {
  public async aggregationAge(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const users = await UserModel.find(
        { age: req.params.age },
        { username: "$username", _id: false }
      );

      res.status(200).send(
        await PostModel.aggregate([
          {
            $match: {
              username: { $in: users.map((user: any) => user.username) },
            },
          },
          { $count: "posts" },
        ])
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async aggregationDate(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      res.status(200).send(
        await PostModel.aggregate([
          {
            $match: {
              $and: [
                {
                  created_at: {
                    $lte: new Date(req.params.dateEnd),
                  },
                },
                {
                  created_at: {
                    $gte: new Date(req.params.dateInit),
                  },
                },
              ],
            },
          },
          { $count: "posts" },
        ])
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async aggregationAgeRange(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const users = await UserModel.find(
        {
          $and: [
            { age: { $lte: req.params.ageEnd } },
            { age: { $gte: req.params.ageInit } },
          ],
        },
        { username: "$username", _id: false }
      );

      res.status(200).send(
        await PostModel.aggregate([
          {
            $match: {
              username: { $in: users.map((user: any) => user.username) },
            },
          },
          { $count: "posts" },
        ])
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
