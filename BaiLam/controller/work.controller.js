import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { getAllWorks, createWork, getWorkById, updateWork, deleteWork} from "../service/work.service.js";

const workController = express.Router();

workController.get("/", asyncCatch(getAllWorks));
workController.get("/:workId", asyncCatch(getWorkById));
workController.post("/", asyncCatch(createWork));
workController.put("/:workId", asyncCatch(updateWork));
workController.delete("/:workId", asyncCatch(deleteWork));

export { workController };
