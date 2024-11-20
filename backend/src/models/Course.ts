import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 4,
    maxLength: 200,
    required: true,
  },
  description: {
    type: String,
    minLength: 20,
    maxLength: 2000,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
