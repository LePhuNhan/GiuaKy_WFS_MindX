import { UserModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res, next) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    username,
    password: hashedPassword,
  });

  const userWithoutPassword = _.omit(user.toObject(), ["password"]);
  res.status(200).send(userWithoutPassword);
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error("Username not found!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Incorrect password!");
  }

  const payload = {
    id: user._id.toString(),
    username: user.username,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "300s",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "1d",
  });

  res.status(200).send({ accessToken, refreshToken });
};

export const refresh = (req, res, next) => {
  const { refreshToken } = req.body;
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

  const newPayload = _.omit(payload, ["exp", "iat"]);

  const accessToken = jwt.sign(newPayload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "30s",
  });

  const newRefreshToken = jwt.sign(newPayload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "1d",
  });

  res.status(200).send({ accessToken, refreshToken: newRefreshToken });
};

export const logout = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    if (!accessToken) {
      return res.status(401).send("Access token is missing");
    }

    if (!req.app.get("tokenBlacklist")) {
      req.app.set("tokenBlacklist", []);
    }
    const tokenBlacklist = req.app.get("tokenBlacklist");

    const decodedAccessToken = jwt.decode(accessToken);
    if (!decodedAccessToken) {
      return res.status(401).send("Invalid access token");
    }

    // Thêm id của token vào tokenBlacklist
    tokenBlacklist.push(decodedAccessToken.jti);

    res.status(200).send("Logged out successfully");
  } catch (error) {
    next(error);
  }
};
