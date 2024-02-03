import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  profile: [{ type: mongoose.Types.ObjectId, ref: "Profile" }]
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
