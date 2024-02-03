import { WorkModel } from "../model/work.model.js";
import { ProfileModel } from "../model/profile.model.js";
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
    const {
      skill,
      projectName,
      projectDescription,
      role,
      startDate,
      endDate,
      workProgress,
      companyName,
      profileId,
    } = req.body;
    const work = await WorkModel.create({
      skill,
      projectName,
      projectDescription,
      role,
      startDate,
      endDate,
      workProgress,
      companyName,
    });
    await ProfileModel.findByIdAndUpdate(profileId, {
      $push: { work: work._id },
    });
    res.status(201).send(work);
  } catch (error) {
    next(error);
  }
};

export const getWorkById = async (req, res, next) => {
  try {
    const workId = req.params.workId;
    const existingWork = await WorkModel.findById(workId);
    if (!existingWork) {
      res.status(400).send("No Work Info found");
    }
    res.status(200).send(existingWork);
  } catch (error) {
    next(error);
  }
};

export const updateWork = async (req, res, next) => {
  try {
    const workId = req.params.workId;
    const existingWork = await WorkModel.findById(workId);
    if (!existingWork) {
      res.status(400).send("No Work Info found");
    }

    const profileId = req.body.profileId;
    await WorkModel.findByIdAndUpdate(workId, req.body, { new: true });
    const profile = await ProfileModel.findOne({ work: workId });
    if (!profile) {
      await ProfileModel.findByIdAndUpdate(profileId, {
        $push: { work: workId },
      });
    }
    const newWork = await WorkModel.findById(workId);
    res.status(201).send(newWork);
  } catch (error) {
    next(error);
  }
};

export const deleteWork = async (req, res, next) => {
    try {
      const workId = req.params.workId;
      const existingWork = await WorkModel.findById(workId);
      if (!existingWork) {
        res.status(400).send("No Work found");
      }
      const profileId = existingWork.profileId; // Lấy id của profile từ công việc
  
      await ProfileModel.findByIdAndUpdate(profileId, {
        $pull: { work: workId },
      }); // Xoá quan hệ
  
      await WorkModel.findByIdAndDelete(workId); // Xoá collection chính
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
  
