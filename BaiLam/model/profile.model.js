import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  fullname: String,
  dateOfBirth: String,
  placeOfBirth: String,
  nationality: String,
  educationProcess: String,
  work: { type: mongoose.Types.ObjectId, ref: "Work" },
  additionalInfo: { type: mongoose.Types.ObjectId, ref: "AdditionalInfo" },
});

const ProfileModel = mongoose.model("Profile", ProfileSchema);

export { ProfileModel };
