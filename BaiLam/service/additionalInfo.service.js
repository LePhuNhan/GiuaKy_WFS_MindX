import { AdditionalInfoModel } from "../model/additionalInfo.model.js";
import { ProfileModel } from "../model/profile.model.js";
export const getAllAdditionalInfos = async (req, res, next) => {
  try {
    const additionalInfos = await AdditionalInfoModel.find();
    res.status(200).send(additionalInfos);
  } catch (error) {
    next(error);
  }
};

export const createAdditionalInfo = async (req, res, next) => {
  try {
    const { interests, personalGoals, profileId } = req.body;
    const existingAdditionalInfo = await ProfileModel.findOne({ interests, personalGoals });

    if (existingAdditionalInfo) {
      return res.status(400).send("A additional info with the same interests or personalGoals already exists.");
    }
    const additionalInfo = await AdditionalInfoModel.create({
      interests,
      personalGoals,
    });
    await ProfileModel.findByIdAndUpdate(profileId, {
      $push: { additionalInfo: additionalInfo._id },
    });
    res.status(201).send(additionalInfo);
  } catch (error) {
    next(error);
  }
};

export const getAdditionalInfoById = async (req, res, next) => {
  try {
    const additionalInfoId = req.params.additionalInfoId;
    const existingAdditionalInfo = await AdditionalInfoModel.findById(
      additionalInfoId
    );
    if (!existingAdditionalInfo) {
      res.status(400).send("No Additional Info found");
    }
    res.status(200).send(existingAdditionalInfo);
  } catch (error) {
    next(error);
  }
};

export const updateAdditionalInfo = async (req, res, next) => {
  try {
    const additionalInfoId = req.params.additionalInfoId;
    const existingAdditionalInfo = await AdditionalInfoModel.findById(additionalInfoId);
    if (!existingAdditionalInfo) {
      res.status(400).send("No Additional Info found");
    }

    const profileId = req.body.profileId;
    await AdditionalInfoModel.findByIdAndUpdate(
      additionalInfoId,
      req.body,
      { new: true }
    );
    const profile = await ProfileModel.findOne({ additionalInfo: additionalInfoId });
    if (!profile) {
      await ProfileModel.findByIdAndUpdate(profileId, {
        $push: { additionalInfo: additionalInfoId },
      });
    }    
    const newAdditionalInfo = await AdditionalInfoModel.findById(additionalInfoId);
    res.status(201).send(newAdditionalInfo);
  } catch (error) {
    next(error);
  }
};



export const deleteAdditionalInfo = async (req, res, next) => {
  try {
    const additionalInfoId = req.params.additionalInfoId;
    const existingAdditionalInfo = await AdditionalInfoModel.findById(additionalInfoId);
    if (!existingAdditionalInfo) {
      res.status(400).send("No Additional Info found");
    }

    const profileId = existingAdditionalInfo.profileId; // Lấy id của profile từ additionalInfo

    await ProfileModel.findByIdAndUpdate(profileId, {
      $pull: { additionalInfo: additionalInfoId },
    }); // Xoá quan hệ

    await AdditionalInfoModel.findByIdAndDelete(additionalInfoId); // Xoá collection chính
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};


