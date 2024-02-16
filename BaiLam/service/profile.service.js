import { ProfileModel } from "../model/profile.model.js";
import { UserModel } from "../model/user.model.js";
export const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await ProfileModel.find().populate("additionalInfo").populate("work");
    res.status(200).send(profiles);
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req, res, next) => {
  try {
    const {
      fullname,
      dateOfBirth,
      placeOfBirth,
      nationality,
      educationProcess,
      userId,
    } = req.body;
    const existingProfile = await ProfileModel.findOne({ dateOfBirth, nationality });

    if (existingProfile) {
      return res.status(400).send("A profile with the same dateOfBirth or nationality already exists.");
    }
    const profile = await ProfileModel.create({
      fullname,
      dateOfBirth,
      placeOfBirth,
      nationality,
      educationProcess,
    });
    await UserModel.findByIdAndUpdate(userId, {
      $push: { profile: profile._id },
    });
    res.status(201).send(profile);
  } catch (error) {
    next(error);
  }
};


export const getProfileById = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;
// const userId = req.user.id;
    const profile = await ProfileModel.findById(profileId);
    if (!profile) {
      return res.status(404).send("Profile not found");
    }
       // if (existingProfile.userId !== userId) {
    //   return res.status(403).send("Unauthorized to update this profile");
    // }
    res.status(200).send(profile);
  } catch (error) {
    next(error);
  }
};


export const updateProfile = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;
    // const userId = req.user.id;

    const existingProfile = await ProfileModel.findById(profileId);
    if (!existingProfile) {
      return res.status(404).send("No Profile Info found");
    }
    // if (existingProfile.userId !== userId) {
    //   return res.status(403).send("Unauthorized to update this profile");
    // }

    const updatedProfile = await ProfileModel.findByIdAndUpdate(profileId, req.body, { new: true });

    res.status(201).send(updatedProfile);
  } catch (error) {
    next(error);
  }
};


export const deleteProfile = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;
    const existingProfile = await ProfileModel.findById(profileId);
    if (!existingProfile) {
      res.status(400).send("No Profile found");
    }
    const userId = existingProfile.userId;

    await UserModel.findByIdAndUpdate(userId, {
      $pull: { profile: profileId },
    });

    await ProfileModel.findByIdAndDelete(profileId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
