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
    res.status(201).send(profile); // Gửi phản hồi với đối tượng profile
  } catch (error) {
    next(error);
  }
};


export const getProfileById = async (req, res, next) => {
  try {
    const profile = await ProfileModel.findById(req.params.profileId).populate("additionalInfo").populate("work");
    res.status(200).send(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;
    const existingProfile = await ProfileModel.findById(profileId);
    if (!existingProfile) {
      res.status(400).send("No Profile Info found");
    }

    const userId = req.body.userId;
    await ProfileModel.findByIdAndUpdate(profileId, req.body, { new: true });
    const user = await UserModel.findOne({ profile: profileId });
    if (!user) {
      await UserModel.findByIdAndUpdate(userId, {
        $push: { profile: profileId },
      });
    }
    const newProfile = await ProfileModel.findById(profileId);
    res.status(201).send(newProfile);
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
    const userId = existingProfile.userId; // Lấy id của profile từ công việc

    await UserModel.findByIdAndUpdate(userId, {
      $pull: { profile: profileId },
    }); // Xoá quan hệ

    await ProfileModel.findByIdAndDelete(profileId); // Xoá collection chính
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
