import express, { Request, Response } from "express";
import { AnalyticsController } from "../controllers/Analytics";

const analyticsController = new AnalyticsController();

export const analyticsRouter = express.Router({
  strict: true,
});

analyticsRouter.get("/:age", (req: Request, res: Response) => {
  analyticsController.aggregationAge(req, res);
});

analyticsRouter.get("/:dateInit/:dateEnd", (req: Request, res: Response) => {
  analyticsController.aggregationDate(req, res);
});
