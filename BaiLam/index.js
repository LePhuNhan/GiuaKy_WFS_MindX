import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

import { userController } from "./controller/user.controller.js";
import { workController } from "./controller/work.controller.js";
import { additionalInfoController } from "./controller/additionalInfo.controller.js";
dotenv.config();

const server = express();

server.use(express.json());
server.use(morgan("combined"));

server.use("/users", userController);
server.use("/works", workController);
server.use("/additionalInfos", additionalInfoController);
server.use("/index", (req, res) => res.status(200).send("Success"));

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    server.listen(process.env.PORT, () => console.log("Server is running!"))
  );

