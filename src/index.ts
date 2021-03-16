import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/User";
import { postRouter } from "./routes/Post";

class Server {
  private app: express.Application;
  private db!: mongoose.Connection;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  private routes(): void {
    this.app.use("/user", userRouter);
    this.app.use("/post", postRouter);
  }

  private config(): void {
    this.app.use(cors({
      origin: 'http://localhost:8080'
    }));
    this.app.use(express.json());
    mongoose.connect("mongodb://localhost:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = mongoose.connection;
  }

  public start(): void {
    this.db.on("error", console.error.bind(console, "connection error:"));
    this.db.once("open", () => {
      this.app.listen(4000, () => {
        console.log(`Server is up!\nyour url is: http://localhost:${4000}`);
      });
    });
  }
}

new Server().start();
