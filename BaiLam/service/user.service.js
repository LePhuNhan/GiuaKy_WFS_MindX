import { UserModel } from "../model/user.model.js";

export const getAllUsers = async (req, res, next) => {
  const users = await UserModel.find().populate("Profile");
  res.status(200).send(users);
};

export const createUser = async (req, res, next) => {
  const user = await UserModel.create(req.body);
  res.status(201).send(user);
};

export const getUserById = ("/:userId",async (req, res, next) => {
  const user = await UserModel.findById(req.params.User_id).populate("Profile");;
  res.status(200).send(user);
});

export const updateUser = ("/:userId",async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.params.User_id, req.body, { new: true });
  res.status(201).send(user);
});

export const deleteUser = ("/:userId",async (req, res, next) => {
  const userId = req.params.User_id;
  await UserModel.findByIdAndDelete(userId);
  res.sendStatus(204);
});
