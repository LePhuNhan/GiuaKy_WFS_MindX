import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { getAllAdditionalInfos, getAdditionalInfoById, createAdditionalInfo, updateAdditionalInfo, deleteAdditionalInfo} from "../service/additionalInfo.service.js"; 

const additionalInfoController = express.Router();

additionalInfoController.get("/", asyncCatch(getAllAdditionalInfos));
additionalInfoController.get("/:additionalInfoId", asyncCatch(getAdditionalInfoById));
additionalInfoController.post("/", asyncCatch(createAdditionalInfo));
additionalInfoController.put("/:additionalInfoId", asyncCatch(updateAdditionalInfo));
additionalInfoController.delete("/:additionalInfoId", asyncCatch(deleteAdditionalInfo));

export { additionalInfoController };
