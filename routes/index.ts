import express, { Express, json } from "express";
import { default as User } from "./user";
import cors from "cors";

export default function (app: Express) {
  app.use(cors());
  app.use(json());
  app.use("/api", User);
}
