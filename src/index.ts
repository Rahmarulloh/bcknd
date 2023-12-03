import express from "express";
import cors from "cors";
import routes from "../routes";
import config from "./config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Samandar Brat!");
});

routes(app);
config(app);
