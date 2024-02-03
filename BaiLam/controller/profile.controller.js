import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { getAllProfiles, createProfile, getProfileById, updateProfile, deleteProfile} from "../service/profile.service.js";

const profileController = express.Router();

profileController.get("/", asyncCatch(getAllProfiles));
profileController.get("/:profileId", asyncCatch(getProfileById));
profileController.post("/", asyncCatch(createProfile));
profileController.put("/:profileId", asyncCatch(updateProfile));
profileController.delete("/:profileId", asyncCatch(deleteProfile));

export { profileController };
