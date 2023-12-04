import { Express, json } from "express";
import { default as User } from "./user";
import { default as Admin } from "./admin";
import cors from "cors";

export default function (app: Express) {
  app.use(cors());
  app.use(json());
  app.use("/api", Admin);
  app.use("/api", User);
}
