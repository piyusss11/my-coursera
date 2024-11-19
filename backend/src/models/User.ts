import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    minLength: 4,
    maxLength: 50,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 4,
    maxLength: 50,
  },
  userName: {
    type: String,
    unique: true,
    trim: true,
    minLength: 4,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
