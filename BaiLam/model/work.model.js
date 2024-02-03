import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  skill: String,
  projectName: [String],
  projectDescription: [String],
  role: [String],
  startDate: [String],
  endDate: [String],
  workProgress: [String],
  companyName: [String],
});

const WorkModel = mongoose.model("Work", WorkSchema);

export { WorkModel };
