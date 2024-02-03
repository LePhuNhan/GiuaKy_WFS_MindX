import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { authen } from "../utils/authen.js";
import { getAllUsers, createUser, getUserById, updateUser, deleteUser, getMe} from "../service/user.service.js";

const userController = express.Router();

userController.get("/", asyncCatch(getAllUsers));
userController.get("/:userId", asyncCatch(getUserById));
userController.post("/", asyncCatch(createUser));
userController.put("/:userId", asyncCatch(updateUser));
userController.delete("/:userId", asyncCatch(deleteUser));
userController.get("/me", asyncCatch(authen), asyncCatch(getMe));
export { userController };
