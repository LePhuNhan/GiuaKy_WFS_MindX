import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdditionalInfoSchema = new Schema({
  interests: String,
  personalGoals: String,
});

const AdditionalInfoModel = mongoose.model("AdditionalInfo",AdditionalInfoSchema);
export { AdditionalInfoModel };
