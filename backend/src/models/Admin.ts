import mongoose, { Model } from "mongoose";
import { IUser } from "./User";

const adminSchema = new mongoose.Schema<IUser>({
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
    default: "",
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

const Admin: Model<IUser> = mongoose.model<IUser>("Admin", adminSchema);
export default Admin;
