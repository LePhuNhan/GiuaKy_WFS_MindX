import { WorkModel } from "../model/work.model.js";

export const getAllWorks = async (req, res, next) => {
  try {
    const works = await WorkModel.find();
    res.status(200).send(works);
  } catch (error) {
    next(error);
  }
};

export const createWork = async (req, res, next) => {
  try {
    const work = await WorkModel.create(req.body);
    res.status(201).send(work);
  } catch (error) {
    next(error);
  }
};

export const getWorkById = async (req, res, next) => {
  try {
    const work = await WorkModel.findById(req.params.workId);
    res.status(200).send(work);
  } catch (error) {
    next(error);
  }
};

export const updateWork = async (req, res, next) => {
  try {
    const work = await WorkModel.findByIdAndUpdate(req.params.workId, req.body, { new: true });
    res.status(201).send(work);
  } catch (error) {
    next(error);
  }
};

export const deleteWork = async (req, res, next) => {
  try {
    await WorkModel.findByIdAndDelete(req.params.workId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
