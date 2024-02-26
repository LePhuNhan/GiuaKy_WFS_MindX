import jwt from "jsonwebtoken";
import { ProfileModel } from "../model/profile.model.js";

export const author = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Unauthorized: No token provided");
    }
    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    const userId = decoded.id;
    const profileId = req.params.profileId;
    const profile = await ProfileModel.findById(profileId);
    console.log(profile.author);
    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    if (profile.author.toString() !== userId) {
      return res.status(403).send("Unauthorized to update this profile");
    }

    next();
  } catch (error) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
};
