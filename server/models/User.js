import mongoose from "mongoose";

const User = mongoose.model("User", {
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, minlength: 3, maxlength: 200, unique: true },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
});

export default User;
