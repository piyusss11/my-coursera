import mongoose, { Document, Model } from "mongoose";
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
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
    maxLength: 50,
    default: "",
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

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
