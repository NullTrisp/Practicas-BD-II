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

      const usernames: string[] = users.map((user: any) => user.username);

      res
        .status(200)
        .send(
          await PostModel.aggregate([
            { $match: { username: { $in: usernames } } },
            { $count: "posts" },
          ])
        );
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
