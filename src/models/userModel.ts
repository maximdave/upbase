import { Schema, model } from 'mongoose';
import { UserSignUp } from '../interfaces/userInterface';

const userSchema = new Schema<UserSignUp>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'non-binary'],
        message: '{VALUE} is not a gender',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile_picture: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('Users', userSchema);

export default UserModel;
