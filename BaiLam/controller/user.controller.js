import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { authen } from "../utils/authen.js";
import { getAllUsers, createUser, getUserById, updateUser, deleteUser, getMe} from "../service/user.service.js";

const userController = express.Router();

userController.get("/", authen,asyncCatch(getAllUsers));
userController.get("/:userId",authen, asyncCatch(getUserById));
userController.post("/",authen, asyncCatch(createUser));
userController.put("/:userId", authen,asyncCatch(updateUser));
userController.delete("/:userId", authen,asyncCatch(deleteUser));
userController.get("/me", asyncCatch(authen), asyncCatch(getMe));
export { userController };
