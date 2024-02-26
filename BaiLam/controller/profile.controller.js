import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { authen } from "../utils/authen.js";
import { author } from "../utils/author.js";
import { validateLogin,validateRefresh,validateRegister } from "../validation/auth.validation.js";
import { getAllProfiles, createProfile, getProfileById, updateProfile, deleteProfile} from "../service/profile.service.js";

const profileController = express.Router();

profileController.get("/",authen, asyncCatch(getAllProfiles));
profileController.get("/:profileId", authen,asyncCatch(getProfileById));
profileController.post("/",authen, asyncCatch(createProfile));
profileController.put("/:profileId",authen,author, asyncCatch(updateProfile));
profileController.delete("/:profileId", authen,asyncCatch(deleteProfile));

export { profileController };
