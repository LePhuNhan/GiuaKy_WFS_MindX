import { UserModel } from "../model/user.model.js";

export const getMe = async (req, res, next) => {
  const userId = req.user.id;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.status(200).send(user);
};

export const getAllUsers = async (req, res, next) => {
  const users = await UserModel.find().populate("profile")
  res.status(200).send(users);
};

export const createUser = async (req, res, next) => {
  const user = await UserModel.create(req.body);
  res.status(201).send(user);
};

export const getUserById = async (req, res, next) => {
  try {
      const user = await UserModel.findById(req.params.userId).populate("profile");
      if (!user) {
          return res.status(404).send("User not found");
      }
      res.status(200).send(user);
  } catch (error) {
      next(error);
  }
};


export const updateUser = async (req, res, next) => {
  try {
    const { password, ...updateData } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await UserModel.findByIdAndUpdate(req.params.userId, updateData, { new: true });
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  await UserModel.findByIdAndDelete(userId);
  res.sendStatus(204).send("deleted success");
};
