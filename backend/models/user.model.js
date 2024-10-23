import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
        type: String,
        require: false,
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema)

export default User
