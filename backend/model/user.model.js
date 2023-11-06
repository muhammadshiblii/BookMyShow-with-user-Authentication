import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
  name: { type: String, require: [true, "namer is required"] },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "username already exist"],
  },
  Password: { type: String, required: [true, "Password is required"] },
});

export default mongoose.model.users || mongoose.model("user", user_schema);




