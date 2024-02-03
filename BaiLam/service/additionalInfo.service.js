import { AdditionalInfoModel } from "../model/additionalInfo.model.js";

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
    const additionalInfo = await AdditionalInfoModel.create(req.body);
    res.status(201).send(additionalInfo);
  } catch (error) {
    next(error);
  }
};

export const getAdditionalInfoById = async (req, res, next) => {
  try {
    const additionalInfo = await AdditionalInfoModel.findById(req.params.additionalInfoId);
    res.status(200).send(additionalInfo);
  } catch (error) {
    next(error);
  }
};

export const updateAdditionalInfo = async (req, res, next) => {
  try {
    const additionalInfo = await AdditionalInfoModel.findByIdAndUpdate(req.params.additionalInfoId, req.body, { new: true });
    res.status(201).send(additionalInfo);
  } catch (error) {
    next(error);
  }
};

export const deleteAdditionalInfo = async (req, res, next) => {
  try {
    await AdditionalInfoModel.findByIdAndDelete(req.params.additionalInfoId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
